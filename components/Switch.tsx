import React from 'react'
import Button, { ButtonProps } from '@/components/Button'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from './ThemedText'
import { Switch } from 'react-native'
import { useTheme } from '@react-navigation/native'
import chroma from 'chroma-js'

type Props = ButtonProps & {
  label: string
  isActived: boolean
  nested?: boolean
  onPress: () => void
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

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      style={{ borderBottomColor: colors.border, borderBottomWidth: 1 }}
    >
      <ThemedView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'transparent',
          borderRadius: 0,
          paddingHorizontal: 20,
          paddingVertical: 5
        }}
      >
        <ThemedText style={{ flex: 1, fontSize: 16 }} disabled={disabled}>{label}</ThemedText>
        <Switch
          style={{ marginLeft: 20 }}
          disabled={disabled}
          value={isActived}
          onValueChange={onPress}
          thumbColor={colors.primary}
          trackColor={{
            true: chroma(colors.primary).brighten(2.5).hex(),
            false: '#666',
          }}
        />
      </ThemedView>
      {children}
    </Button>
  )
}

export default SwitchLabeled
