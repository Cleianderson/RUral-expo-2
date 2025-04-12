import { Redirect } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as SplashsScreen from 'expo-splash-screen'

import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

SplashsScreen.preventAutoHideAsync()
SplashsScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootApp() {
  const { isOnboarded, isAppReady } = useSelector<RootState, MainState>(state => state.mainState)

  useEffect(() => {
    if (isAppReady) {
      SplashsScreen.hide()
    }
  }, [isAppReady])

  const _app = useCallback(() => {
    if (isAppReady === false) return null

    // While Onboarding page don't exist
    if (isOnboarded === undefined) {
      return <Redirect href="/main" />
    }

    return (
      <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ThemedText>Build Onboarding page</ThemedText>
      </ThemedView>
    )
  }, [isOnboarded, isAppReady])

  return _app()
}
