import { Redirect } from 'expo-router';
import { useCallback, useState } from 'react';

export default function RootApp() {
  const [isOnboarded, setIsOnboarded] = useState(true)

  const _app = useCallback(()=>{
    if(isOnboarded){
      return <Redirect href='/home' />
    }

  },[isOnboarded])

  return _app()
}
