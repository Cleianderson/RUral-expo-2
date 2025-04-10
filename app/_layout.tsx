import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'

import { Themes } from '@/constants/Theme'
import { useColorScheme } from '@/hooks/useColorScheme'
import store from '@/store'
import Toast from '@/components/Toast'
import ToastProvider from '@/providers/Toast'
import { StatusBar } from 'react-native'

// import Requesting from "@/components/Requesting"
// import Config from "@/providers/Config"

function ThemeContainer() {
  const colorScheme = useColorScheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? Themes.dark : Themes.light}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#232323' : '#f0f0f0'}
      />
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
