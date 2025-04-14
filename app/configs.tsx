// import { useContext } from 'react'
import { BackHandler, ScrollView, SectionList, View } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// import SwitchLabeled from './components/SwitchLabeled'
import Button from '@/components/Button'
import { ThemedView } from '@/components/ThemedView'
import SwitchLabeled from '@/components/Switch'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from '@react-navigation/native'
import { Sagas } from '@/constants/Sagas'
import { useDispatch, useSelector } from 'react-redux'
import Picker from '@/components/Picker'
// import Config from '~/contexts/ConfigContext'

type ConfigData = {
  type: 'picker' | 'switch'
  pickerOptions?: { label: string, value: string }[]
  label: string
  selectedValue?: string
  nested?: boolean
  disabled?: boolean
  isActived?: boolean
  onPress: (value?: string | number, index?: number) => void
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
  ]

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <SectionList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        sections={CONFIGS}
        keyExtractor={(_, index) => String(index)}
        renderSectionHeader={(item) => (
          <ThemedText
            style={{
              fontSize: 20,
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
            }}
          >
            {item.type === 'switch' && (
              <SwitchLabeled {...item} onPress={() => item.onPress()} />
            )}
            {item.type === 'picker' && (
              <Picker onValueChange={item.onPress} {...item} />
            )}
          </View>
        )}
      />
      <Button
        onPress={() => {
          const clear = async () => {
            // await AsyncStorage.clear()
            BackHandler.exitApp()
          }
          clear()
        }}
      >
        <ThemedText
          style={{
            color: '#fff',
            fontWeight: '600',
            backgroundColor: colors.notification,
            padding: 5,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          LIMPAR DADOS DO APLICATIVO
        </ThemedText>
      </Button>
    </ThemedView>
  )
}
