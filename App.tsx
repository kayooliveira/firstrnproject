/* eslint-disable camelcase */
import { Header } from '@/components/header'
import { Tasks } from '@/components/tasks'
import { slugify } from '@/utils/slugify'
import {
  Inter_100Thin,
  Inter_900Black,
  useFonts
} from '@expo-google-fonts/inter'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from '@types/task'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'

export default function App() {
  const [taskInput, setTaskInput] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])

  const isTaskInputFilled = taskInput.length > 0

  async function getTasks() {
    const tasks = await AsyncStorage.getItem('tasks')
    if (tasks) {
      setTasks(JSON.parse(tasks))
    }
  }

  async function storeTasks(tasks: Task[]) {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
  }

  useEffect(() => {
    getTasks()

    return () => setTasks([])
  }, [])

  useEffect(() => {
    storeTasks(tasks)
  }, [tasks])

  async function createNewTask() {
    if (!isTaskInputFilled) {
      return
    }

    const taskExists = tasks.find(task => task.task === taskInput)
    if (taskExists) {
      Alert.alert('Tarefa Existente', 'Esta tarefa já existe!', [
        { text: 'OK' }
      ])
      return
    }
    const taskData: Task = {
      id: slugify(taskInput),
      task: taskInput,
      finished: false
    }
    setTaskInput('')
    const newTasks = [...tasks, taskData]
    setTasks(newTasks)
  }

  async function removeTask(task: string) {
    const newTasks = tasks.filter(ftask => ftask.id !== task)
    setTasks(newTasks)
  }

  function finishTask(task: string) {
    const findedTask = tasks.find(ftask => ftask.id === task)
    if (findedTask) {
      removeTask(task)
      setTasks(tasks => {
        const newTasks = findedTask.finished
          ? [{ ...findedTask, finished: false }, ...tasks]
          : [...tasks, { ...findedTask, finished: true }]
        return newTasks
      })
    }
  }

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_900Black
  })

  if (!fontsLoaded) {
    return <Text>Não foi possivel iniciar o aplicativo.</Text>
  }

  return (
    <View className="flex-1 bg-brand-backgroundDark pt-8">
      <Header
        onCreateNewTask={createNewTask}
        onTaskInputChange={setTaskInput}
        isTaskInputFilled={isTaskInputFilled}
        taskInput={taskInput}
      />
      <Tasks
        tasks={tasks}
        onRemoveTask={removeTask}
        onFinishTask={finishTask}
      />
      <StatusBar style="light" />
    </View>
  )
}
