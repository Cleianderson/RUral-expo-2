import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const Themes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1b2d4f',
      background: 'rgb(240, 240, 240)',
      unselect: 'rgb(240, 240, 240)',
      text_contrast: 'rgb(240, 240, 240)'
    }
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(226, 203, 164)',
      background: 'rgb(43, 43, 43)',
      card: 'rgb(35, 35, 35)',
      unselect: 'rgb(63, 63, 63)',
      text_contrast: 'rgb(43, 43, 43)'
    }
  },
}