import { Redirect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sagas } from '@/constants/Sagas';


export default function RootApp() {
  const [isOnboarded, setIsOnboarded] = useState(true)

  const dispatch = useDispatch()



  useEffect(() => {
    let _day = new Date(Date.now()).getDay() - 1
    _day = _day > 4 || _day < 0 ? 0 : _day
    dispatch(Sagas.setDay(_day))

    // initalizeOneSignal()
    dispatch(Sagas.getFavorites())
    dispatch(Sagas.getWeek())
    dispatch(Sagas.getWarnings())
  }, [])


  const _app = useCallback(() => {
    if (isOnboarded) {
      return <Redirect href='/main' />
    }

  }, [isOnboarded])

  return _app()
}
