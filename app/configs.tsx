// import { useContext } from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// import SwitchLabeled from './components/SwitchLabeled'
import Button from '@/components/Button'
import { ThemedView } from '@/components/ThemedView'
import SwitchLabeled from '@/components/Switch'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from '@react-navigation/native'
// import Config from '~/contexts/ConfigContext'

export default function Configuration() {
  const { colors } = useTheme()

  const { configs, configDispatch } = { configs: { showIndicator: true, showDateOnIndicator: true }, configDispatch: ({ type = '', data = {} }) => { } }// useContext(Config)
  const { showIndicator, showDateOnIndicator } = configs

  const updateConfig = (data: any) => configDispatch({ type: 'UPDATE_CONFIG', data: { ...data } })

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <SwitchLabeled
          label='Mostrar indicador de dias'
          isActived={showIndicator}
          onPress={() => updateConfig({ showIndicator: !showIndicator })}
        />
        <SwitchLabeled
          nested
          disabled={showIndicator === false}
          label='Exibir datas'
          isActived={showDateOnIndicator}
          onPress={() => updateConfig({ showDateOnIndicator: !showDateOnIndicator })}
        />
      </View>
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
          style={{ color: '#fff', fontWeight: '600', backgroundColor: colors.notification, padding: 5, textAlign: 'center', borderRadius: 2 }}
        >LIMPAR TODOS OS DADOS</ThemedText>
      </Button>
    </ScrollView>
  )
}
