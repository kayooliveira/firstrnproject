import { AntDesign } from '@expo/vector-icons'
import { Task as TaskType } from '@types/task'
import { ScrollView, Text, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { Task } from './task'

interface TasksProps {
  tasks: TaskType[]
  onRemoveTask: (task: string) => void
  onFinishTask: (task: string) => void
}

export function Tasks({ tasks = [], onRemoveTask, onFinishTask }: TasksProps) {
  const hasTasks = tasks.length > 0
  const tasksCount = tasks.length
  const finishedTasksCount = tasks.filter(task => task.finished).length

  return (
    <View className="-z-10 flex w-full flex-1 flex-col items-center space-y-4 bg-brand-backgroundLight px-6 pb-4 pt-12  ">
      <View className="mb-4 flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-start">
          <Text className="text-base font-bold text-brand-primary">
            Tarefas{' '}
          </Text>
          <Text className="w-6 flex-row rounded-full bg-brand-input p-1 text-center text-xs font-bold leading-none text-white">
            {tasksCount}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-start">
          <Text className="text-base font-bold text-brand-secondary">
            Concluídas{' '}
          </Text>

          <Text className="w-6 flex-row rounded-full bg-brand-input p-1 text-center text-xs font-bold leading-none text-white">
            {finishedTasksCount}
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="h-full max-h-full w-full"
      >
        {tasks.map(task => (
          <Task
            key={task.id}
            onRemoveTask={onRemoveTask}
            onFinishTask={onFinishTask}
            task={task}
          />
        ))}
        {!hasTasks && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="flex w-full items-center justify-center"
          >
            <AntDesign name="exception1" size={64} color="#808080" />
            <Text className="text-xl text-brand-text">
              Você não tem tarefas!
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  )
}
