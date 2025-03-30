import chroma from 'chroma-js'
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
      background: chroma(DarkTheme.colors.background).brighten(0.85).hex(),
      card: chroma(DarkTheme.colors.background).brighten(0.45).hex(),
      unselect: chroma(DarkTheme.colors.background).brighten(0.85).hex(),
      text_contrast: 'rgb(43, 43, 43)'
    }
  },
}