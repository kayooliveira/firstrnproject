import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

interface RadioButtonProps {
  defaultChecked?: boolean
  onPress: (value: boolean) => void
  disabled?: boolean
  checked?: boolean
}
export function RadioButton({
  defaultChecked = false,
  onPress,
  disabled = false,
  checked = false
}: RadioButtonProps) {
  const [value, setValue] = useState<boolean>(defaultChecked)

  function handleChange() {
    const newState = !value
    setValue(newState)
    onPress(newState)
  }

  useEffect(() => {
    setValue(checked)
  }, [checked])

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      onPress={handleChange}
      className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-white bg-brand-input"
    >
      {value && <View className="h-3 w-3 rounded-full bg-brand-primary" />}
    </TouchableOpacity>
  )
}
