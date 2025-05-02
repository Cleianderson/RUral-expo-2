import { View, type ViewProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const { colors: { background: backgroundColor } } = useTheme()

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
