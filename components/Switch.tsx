import React from 'react'
import Button, { ButtonProps } from '@/components/Button'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from './ThemedText'
import { Switch } from 'react-native'
import { useTheme } from '@react-navigation/native'


type Props = ButtonProps & { label: string, isActived: boolean, nested?: boolean, onPress: () => void, disabled?: boolean }

const SwitchLabeled: React.FC<Props> = ({ isActived, label, children, nested, onPress, disabled }) => {
  const { colors } = useTheme()

  return (
    <Button disabled={disabled} onPress={onPress} >
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <Switch style={{ marginRight: 20 }} disabled={disabled} value={isActived} onValueChange={onPress} />
        <ThemedText disabled={disabled} >{label}</ThemedText>
      </ThemedView>
      {children}
    </Button>
  )
}

export default SwitchLabeled