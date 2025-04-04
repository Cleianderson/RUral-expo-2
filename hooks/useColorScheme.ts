import { useColorScheme as _useColorScheme, ColorSchemeName } from 'react-native';

import { useSelector } from "react-redux";

export function useColorScheme(): ColorSchemeName {
  const { darkTheme } = useSelector<RootState, Configurations>(state => state.mainState.configurations)
  const userThemeDark = _useColorScheme()

  if (darkTheme && userThemeDark === 'dark') {
    // return _useColorScheme()
    return 'dark'
  }

  return 'light'
  // return _useColorScheme()
}
