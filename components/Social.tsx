import { useTheme } from '@react-navigation/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { openURL } from 'expo-linking'

import { ThemedText } from '@/components/ThemedText'
import Button, { ButtonProps } from '@/components/Button'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Platform, View } from 'react-native'

export type IconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name']
type SocialProps = ButtonProps & {
  label: string
  urlStr?: string
  info?: string | null
  iconName?: IconName
}

export default function Social({ label, info, iconName, urlStr }: SocialProps) {
  const { colors } = useTheme()

  const handleOnPress = async () => {
    if (urlStr === undefined || urlStr === null) {
      return null
    }

    if (Platform.OS === 'web') {
      return window.open(urlStr, '_blank')
    }

    openURL(urlStr)
  }

  return (
    <Button
      onPress={handleOnPress}
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons size={24} color={colors.text} name={iconName} />
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <ThemedText style={{ fontSize: 12, lineHeight: 12, fontWeight: '300' }}>
          {label}
        </ThemedText>
        <ThemedText>{info}</ThemedText>
      </View>
      <IconSymbol size={24} color={colors.primary} name="chevron.right" />
    </Button>
  )
}
