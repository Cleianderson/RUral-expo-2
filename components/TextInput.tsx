import chroma from 'chroma-js'
import { useTheme } from '@react-navigation/native';
import { TextInput as _TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

type Props = TextInputProps & { label: string, needed?: boolean, containerStyle?: ViewStyle }

export default function TextInput({ needed, label, containerStyle, ...props }: Props) {
  const { colors, dark } = useTheme()

  return (
    <View style={{ borderWidth: 1, borderColor: colors.border, padding: 10, borderRadius: 5, paddingTop: 2, marginVertical: 5, ...containerStyle }}>
      <ThemedText style={{ color: colors.primary }}>
        {label}
        {needed && <ThemedText style={{ color: colors.notification }}> *</ThemedText>}
      </ThemedText>
      <_TextInput style={{ fontSize: 16, color: colors.text }} placeholderTextColor={dark ? chroma(colors.text).darken(2.5).hex() : chroma(colors.text).brighten(2.5).hex()} {...props} />
    </View>
  )
}
