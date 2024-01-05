import { AntDesign } from '@expo/vector-icons'
import classNames from 'classnames'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { Logo } from './logo'

interface HeaderProps {
  taskInput: string
  onTaskInputChange: (task: string) => void
  onCreateNewTask: () => void
  isTaskInputFilled: boolean
}

export function Header({
  taskInput,
  onTaskInputChange,
  onCreateNewTask,
  isTaskInputFilled
}: HeaderProps) {
  return (
    <View className="relative flex h-32 items-center justify-center bg-brand-backgroundDark px-6 py-4">
      <View className="flex flex-row items-stretch justify-center gap-1">
        <View className="flex w-10 items-center justify-center">
          <Logo />
        </View>
        <View className="flex flex-row items-center justify-center">
          <Text className="font-interBlack text-4xl leading-none text-brand-primary">
            to<Text className="text-brand-secondary">do</Text>
          </Text>
        </View>
      </View>
      <SafeAreaView className="absolute -bottom-6 z-20 flex w-full flex-row items-stretch justify-center">
        <TextInput
          value={taskInput}
          placeholderTextColor="#FFFFFF"
          onChangeText={onTaskInputChange}
          className="mr-2 h-12 w-full flex-1 rounded-md bg-brand-input px-4 text-brand-white"
          keyboardType="default"
          placeholder="Ex: Comprar pão"
        />
        <TouchableOpacity
          disabled={!isTaskInputFilled}
          onPress={onCreateNewTask}
          activeOpacity={0.9}
          className={classNames(
            'flex items-center justify-center rounded-md bg-brand-primary px-2 shadow-md',
            {
              'bg-brand-primary': isTaskInputFilled,
              'bg-brand-text': !isTaskInputFilled
            }
          )}
        >
          <Text className="font-bold text-brand-white shadow-md">
            Adicionar <AntDesign name="pluscircle" size={12} />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}
