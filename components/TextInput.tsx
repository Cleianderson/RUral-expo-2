import { useTheme } from '@react-navigation/native';
import { TextInput as _TextInput, TextInputProps, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

type Props = TextInputProps & { label: string, needed?: boolean }

export default function TextInput({ needed, label, ...props }: Props) {
  const { colors } = useTheme()

  return (
    <View style={{ borderWidth: 1, borderColor: colors.primary, padding: 10, borderRadius: 5, paddingTop: 2, marginVertical: 5 }}>
      <ThemedText style={{ color: colors.primary }}>
        {label}
        {needed && <ThemedText style={{ color: colors.notification }}> *</ThemedText>}
      </ThemedText>
      <_TextInput style={{ fontSize: 16 }} {...props} />
    </View>
  )
}
