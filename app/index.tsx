import { Redirect } from 'expo-router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

export default function RootApp() {
  const { isOnboarded, isAppReady } = useSelector<RootState, MainState>(state => state.mainState)

  const _app = useCallback(() => {
    // if (isAppReady === false) return null

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
