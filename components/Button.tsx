import React from 'react';
import { Pressable, PressableProps } from 'react-native';

export type ButtonProps = PressableProps

export default function Button(props: ButtonProps) {
  return (
    <Pressable hitSlop={20} {...props} />
  )
}
