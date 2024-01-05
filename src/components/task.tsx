import { AntDesign } from '@expo/vector-icons'
import { Task as TaskType } from '@types/task'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  FadeInLeft,
  FadeOutRight,
  SequencedTransition
} from 'react-native-reanimated'

import { RadioButton } from '../ui/radio-button'

interface TaskProps {
  onRemoveTask: (task: string) => void
  onFinishTask: (task: string) => void
  task: TaskType
}
export function Task({ task, onRemoveTask, onFinishTask }: TaskProps) {
  const [isFinished, setIsFinished] = useState<boolean>(task.finished)

  function handleChangeFinished() {
    onFinishTask(task.id)
  }

  useEffect(() => {
    setIsFinished(task.finished)
  }, [task.finished])

  function handleRemoveTask() {
    Alert.alert('Deletar tarefa', 'Deseja realmente deletar esta tarefa?', [
      {
        style: 'cancel',
        text: 'Cancelar'
      },
      {
        style: 'destructive',
        onPress: () => {
          onRemoveTask(task.id)
        },
        text: 'Sim'
      }
    ])
  }
  FadeOutRight.duration(1000)
  return (
    <Animated.View
      layout={SequencedTransition}
      entering={FadeInLeft}
      exiting={FadeOutRight}
      className="my-1"
    >
      <View
        key={task.id}
        className="flex w-full flex-row items-center rounded-md bg-brand-input p-4 shadow-md"
      >
        <RadioButton
          checked={isFinished}
          defaultChecked={isFinished}
          onPress={handleChangeFinished}
        />

        <TouchableOpacity
          activeOpacity={1}
          onPress={handleChangeFinished}
          className="mx-4 flex-1"
        >
          <Text
            className={classNames('text-base leading-none text-brand-white', {
              'line-through': isFinished
            })}
          >
            {task.task}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} onPress={handleRemoveTask}>
          <AntDesign name="delete" size={20} color="#ff0f0f" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}
