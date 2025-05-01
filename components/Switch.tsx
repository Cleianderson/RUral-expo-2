import React from 'react'
import Button, { ButtonProps } from '@/components/Button'
import { ThemedText } from './ThemedText'
import { useTheme } from '@react-navigation/native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

type Props = ButtonProps & {
  label: string
  isActived?: boolean
  nested?: boolean
  onPress: (value?: string) => void
  disabled?: boolean
}

const SwitchLabeled: React.FC<Props> = ({
  isActived,
  label,
  children,
  nested,
  onPress,
  disabled,
}) => {
  const { colors } = useTheme()

  const styleDot = useAnimatedStyle(
    () => ({
      width: 18,
      height: 18,
      borderRadius: 30,
      backgroundColor: disabled ? '#aaa' : colors.background,
      left: withSpring(isActived ? 26 : 0, { duration: 500, dampingRatio: 1 }),
    }),
    [isActived, disabled, colors]
  )

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <ThemedText style={{ flex: 1, fontSize: 16 }} disabled={disabled}>
        {label}
      </ThemedText>
      <Animated.View
        style={{
          width: 50,
          borderRadius: 30,
          backgroundColor: isActived && !disabled ? colors.primary : '#666',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        <Animated.View style={styleDot} />
      </Animated.View>
      {children}
    </Button>
  )
}

export default SwitchLabeled
