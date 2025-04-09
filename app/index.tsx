import { Redirect } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as SplashsScreen from 'expo-splash-screen'

import { Sagas } from '@/constants/Sagas'

SplashsScreen.preventAutoHideAsync()
SplashsScreen.setOptions({
  duration: 1000,
  fade: true,
})

export default function RootApp() {
  const [isOnboarded, setIsOnboarded] = useState(true)
  const [isAppReady, setIsAppReady] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day
    dispatch(Sagas.setDay(_day))

    // initalizeOneSignal()
    dispatch(Sagas.getFavorites())
    dispatch(Sagas.getWeek())
    dispatch(Sagas.getWarnings())
    dispatch(Sagas.getConfigurations())

    setIsAppReady(true)
  }, [])

  useEffect(() => {
    if (isAppReady) {
      SplashsScreen.hide()
    }
  }, [isAppReady])

  const _app = useCallback(() => {
    if (isAppReady === false) return null

    if (isOnboarded) {
      return <Redirect href="/main" />
    }
  }, [isOnboarded, isAppReady])

  return _app()
}
