import { ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { Themes } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import store from "@/store";

// import Requesting from "@/components/Requesting"
// import Config from "@/providers/Config"

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? Themes.dark : Themes.light}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name='main' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
          <Stack.Screen name='warnings' options={{ title: 'Avisos' }} />
          <Stack.Screen name='configs' options={{ title: 'Configurações' }} />
        </Stack>
      </Provider>
    </ThemeProvider>
  )
}