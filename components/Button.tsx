import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity hitSlop={20} {...props} />
  )
}
