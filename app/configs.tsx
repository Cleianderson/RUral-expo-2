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
// import Config from '~/contexts/ConfigContext'

export default function Configuration() {
  const { colors } = useTheme()
  const dispatch = useDispatch()

  const configs = useSelector<RootState, Configurations>(state => state.mainState.configurations)
  const { showIndicator, showDateOnIndicator } = configs

  const updateConfig = (data: any) =>
    dispatch(Sagas.updateConfigurations(data))

  const CONFIGS = [
    {
      title: 'Datas',
      data: [
        {
          type: 'switch',
          label: 'Mostrar indicador de datas',
          isActived: showIndicator,
          onPress: () => updateConfig({ showIndicator: !showIndicator }),
        },
        {
          type: 'switch',
          label: 'Mostrar datas',
          nested: true,
          disabled: showIndicator === false,
          isActived: showDateOnIndicator,
          onPress: () =>
            updateConfig({ showDateOnIndicator: !showDateOnIndicator }),
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
            <SwitchLabeled {...item} />
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
