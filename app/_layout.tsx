import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { Provider, useDispatch } from 'react-redux'

import { Themes } from '@/constants/Theme'
import { useColorScheme } from '@/hooks/useColorScheme'
import store from '@/store'
import Toast from '@/components/Toast'
import ToastProvider from '@/providers/Toast'
import { StatusBar, StatusBarProps } from 'react-native'
import { useEffect, useState } from 'react'
import { Sagas } from '@/constants/Sagas'

// import Requesting from "@/components/Requesting"
// import Config from "@/providers/Config"

function ThemeContainer() {
  const colorScheme = useColorScheme()
  const dispatch = useDispatch()

  const [statusBarProps, setStatusBarProps] = useState<StatusBarProps | null>(null)

  useEffect(() => {
    setStatusBarProps({
      barStyle: colorScheme === 'dark' ? 'light-content' : 'dark-content',
      backgroundColor: colorScheme === 'dark' ? '#232323' : '#f0f0f0'
    })
  }, [colorScheme])

  useEffect(() => {
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day

    dispatch(Sagas.setDay(_day))
    // initalizeOneSignal()
    dispatch(Sagas.getFavorites())
    dispatch(Sagas.getWeek())
    dispatch(Sagas.getWarnings())
    dispatch(Sagas.getConfigurations())
  }, [])
  return (
    <ThemeProvider value={colorScheme === 'dark' ? Themes.dark : Themes.light}>
      <StatusBar {...statusBarProps} />
      <Stack>
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="warnings" options={{ title: 'Avisos' }} />
        <Stack.Screen name="configs" options={{ title: 'Configurações' }} />
      </Stack>
      <Toast />
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <ThemeContainer />
      </ToastProvider>
    </Provider>
  )
}
