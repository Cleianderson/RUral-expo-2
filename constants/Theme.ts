import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const Themes = {
  light: {
    ...DefaultTheme, colors: {
      ...DefaultTheme.colors,
      primary: '#1b2d4f'
    }
  },
  dark: {
    ...DarkTheme, colors: {
      ...DarkTheme.colors,
      primary: 'blue'
    }
  },
}