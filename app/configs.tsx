// import { useContext } from 'react'
import { Platform, SectionList, View } from 'react-native'
import * as Aplication from 'expo-application'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// import SwitchLabeled from './components/SwitchLabeled'
import { ThemedView } from '@/components/ThemedView'
import SwitchLabeled from '@/components/Switch'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from '@react-navigation/native'
import { Sagas } from '@/constants/Sagas'
import { useDispatch, useSelector } from 'react-redux'
import Picker from '@/components/Picker'
import Info from '@/components/Info'
import Social, { IconName } from '@/components/Social'
import { IconSymbolName } from '@/components/ui/IconSymbol'
// import Config from '~/contexts/ConfigContext'

type ConfigData = {
  type: 'picker' | 'switch' | 'info' | 'social'
  pickerOptions?: { label: string, value: string }[]
  label: string
  info?: string | null
  iconName?: IconName
  urlStr?: string
  selectedValue?: string
  nested?: boolean
  disabled?: boolean
  isActived?: boolean
  onPress?: (value?: string | number, index?: number) => void
}
type ConfigProps = {
  title: string
  data: ConfigData[]
}

export default function Configuration() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const configs = useSelector<RootState, Configurations>(
    (state) => state.mainState.configurations
  )
  const { showIndicator, showDateOnIndicator, colorScheme } = configs

  const updateConfig = (data: any) => dispatch(Sagas.updateConfigurations(data))

  const CONFIGS: ConfigProps[] = [
    {
      title: 'Indicador do dia',
      data: [
        {
          type: 'switch',
          label: 'Mostrar indicador',
          isActived: showIndicator,
          onPress: () => updateConfig({ showIndicator: !showIndicator }),
        },
        {
          type: 'switch',
          label: 'Mostrar data',
          nested: true,
          disabled: showIndicator === false,
          isActived: showDateOnIndicator,
          onPress: () =>
            updateConfig({ showDateOnIndicator: !showDateOnIndicator }),
        },
      ],
    },
    {
      title: 'Aparência',
      data: [
        {
          type: 'picker',
          pickerOptions: [
            { label: 'Claro', value: 'light' },
            { label: 'Escuro', value: 'dark' },
            { label: 'Padrão do sistema', value: 'null' },
          ],
          label: 'Tema',
          selectedValue: colorScheme as string,
          onPress: (value, index) => {
            const _value = value === 'null' ? null : value
            updateConfig({ colorScheme: _value })
          },
        },
      ],
    },
    {
      title: 'Redes sociais e contatos',
      data: [
        {
          type: 'social',
          label: 'Site RUral',
          iconName: 'web',
          info: 'rural.expo.app',
          urlStr: 'https://rural.expo.app'
        },
        {
          type: 'social',
          label: 'E-mail',
          iconName: 'email',
          info: 'cgaru.progest@ufrpe.br',
          urlStr: 'mailto:cgaru.progest@ufrpe.br'
        },
        {
          type: 'social',
          label: 'Instagram',
          iconName: 'instagram',
          info: '@progestiru',
          urlStr: 'https://www.instagram.com/progestiru/'
        },
        {
          type: 'social',
          label: 'Telefone',
          iconName: 'phone-classic',
          info: '(81) 3320-6196',
          urlStr: 'tel:+558133206196'
        },
      ],
    },
    {
      title: 'Sobre o aplicativo',
      data: [
        {
          type: 'info',
          label: 'Versão',
          info: Aplication.nativeApplicationVersion ?? Platform.OS
        },
      ],
    },
  ]

  return (
    <ThemedView style={{ flex: 1 }}>
      <SectionList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, padding: 20 }}
        sections={CONFIGS}
        keyExtractor={(_, index) => String(index)}
        renderSectionHeader={(item) => (
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: 700,
              paddingBottom: 10,
              paddingTop: 20,
            }}
          >
            {item.section.title}
          </ThemedText>
        )}
        renderItem={({ item, index, section }) => (
          <View
            style={{
              backgroundColor: colors.card,
              borderTopLeftRadius: index === 0 ? 7 : 0,
              borderTopRightRadius: index === 0 ? 7 : 0,
              borderBottomLeftRadius: index === section.data.length - 1 ? 7 : 0,
              borderBottomRightRadius:
                index === section.data.length - 1 ? 7 : 0,
              paddingHorizontal: 20,
              paddingVertical: 10
            }}
          >
            {item.type === 'switch' && (
              <SwitchLabeled {...item} onPress={() => item.onPress?.()} />
            )}
            {item.type === 'picker' && (
              <Picker onValueChange={item.onPress} {...item} />
            )}
            {item.type === 'info' && (
              <Info {...item} />
            )}
            {item.type === 'social' && (
              <Social {...item} onPress={() => { }} />
            )}
          </View>
        )}
      />
    </ThemedView>
  )
}
