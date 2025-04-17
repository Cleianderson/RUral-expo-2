import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const { colorScheme } = useSelector<RootState, Configurations>(state => state.mainState.configurations)
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const rnColorScheme = useRNColorScheme();

  if (hasHydrated && colorScheme) {
    return colorScheme;
  }

  if (colorScheme === null) {
    return rnColorScheme
  }

  return 'light';
}
