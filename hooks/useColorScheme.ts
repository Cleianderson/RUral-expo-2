import { useColorScheme as _useColorScheme, ColorSchemeName } from 'react-native';

import { useSelector } from "react-redux";

export function useColorScheme(): ColorSchemeName {
  const { colorScheme } = useSelector<RootState, Configurations>(state => state.mainState.configurations)
  const userThemeDark = _useColorScheme()

  if (colorScheme === null) {
    return userThemeDark
  }

  return colorScheme
}
