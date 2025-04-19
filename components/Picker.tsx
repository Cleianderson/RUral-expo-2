import { useTheme } from '@react-navigation/native'
import { useState } from 'react'

import Button from '@/components/Button'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type PickerProps = {
  label: string
  pickerOptions?: { label: string; value: string }[]
  selectedValue?: string | number;
  onValueChange?: (itemValue: string | number, itemIndex: number) => void;
}

export default function Picker({
  pickerOptions = [],
  label,
  selectedValue,
  onValueChange,
  ...props
}: PickerProps) {
  const { colors } = useTheme()
  const [isOptionsVisible, setIsOptionVisible] = useState(false)

  const optionsStyle = useAnimatedStyle(
    () => ({
      position: 'absolute',
      padding: 8,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: 6,
      right: 0,
      bottom: 0,
      opacity: withTiming(isOptionsVisible ? 1 : 0),
      display: isOptionsVisible ? 'flex' : 'none',
      zIndex: 3,
      elevation: 3,
    }),
    [isOptionsVisible, colors]
  )

  const handleValueChange = (itemValue: string | number, index: number) => {
    onValueChange?.(itemValue, index)
    setIsOptionVisible(!isOptionsVisible)
  }

  const handleOpenOptions = () => {
    setIsOptionVisible(!isOptionsVisible)
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
      }}
      onPress={handleOpenOptions}
    >
      <ThemedView
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ThemedText style={{ flex: 1, fontSize: 16 }}>{label}</ThemedText>
        <ThemedView
          style={{
            backgroundColor: colors.background,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 5,
            paddingRight: 3,
            borderRadius: 8,
          }}
        >
          <ThemedText style={{ marginRight: 10 }}>{selectedLabel}</ThemedText>
          <IconSymbol name="chevron.right" size={24} color={colors.primary} />
        </ThemedView>
      </ThemedView>
      <Animated.View style={optionsStyle}>
        {pickerOptions.map(({ label, value }, index) => (
          <Button
            key={value}
            style={{
              backgroundColor: colors.card,
              paddingVertical: 8,
            }}
            onPress={() => handleValueChange(value, index)}
          >
            <ThemedText>{label}</ThemedText>
          </Button>
        ))}
      </Animated.View>
    </Button>
  )
}
