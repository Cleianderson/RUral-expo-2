import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
} from '@react-native-picker/picker'
import { useTheme } from '@react-navigation/native'
import { useRef } from 'react'

import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import Button from '@/components/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'

type PickerProps = RNPickerProps & {
  label: string
  pickerOptions?: { label: string; value: string }[]
}

export default function Picker({
  pickerOptions = [],
  label,
  selectedValue,
  onValueChange,
  ...props
}: PickerProps) {
  const { colors } = useTheme()
  const pickerRef = useRef<RNPicker<string | number>>(null)

  const handleValueChange = (itemValue: string | number, index: number) => {
    onValueChange?.(itemValue, index)
  }

  const selectedLabel = pickerOptions.find(
    (item) => String(item.value) === String(selectedValue)
  )?.label

  return (
    <Button
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      onPress={() => pickerRef.current?.focus()}
    >
      <ThemedView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <ThemedText style={{ fontSize: 16 }}>{label}</ThemedText>
        <ThemedText style={{ fontSize: 12 }}>{selectedLabel}</ThemedText>
      </ThemedView>
      <IconSymbol name="chevron.right" size={24} color={colors.primary} />
      <RNPicker
        ref={pickerRef}
        style={{ width: 0 }}
        dropdownIconColor={colors.card}
        prompt={label}
        onValueChange={handleValueChange}
        mode="dropdown"
        {...props}
      >
        {pickerOptions.map(({ label, value }) => (
          <RNPicker.Item
            key={value}
            label={label}
            value={value}
            color={colors.text}
            style={{ backgroundColor: colors.card }}
          />
        ))}
      </RNPicker>
    </Button>
  )
}
