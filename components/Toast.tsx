import { useContext, useEffect, useState } from 'react'
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated'

import ToastContext from '@/contexts/ToastContext'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { SFSymbol } from 'expo-symbols'

const TYPE_MAP: Map<'INFO' | 'SUCCESS' | 'FAIL' | 'WARNING', SFSymbol> =
  new Map([
    ['INFO', 'info.circle'],
    ['SUCCESS', 'checkmark.circle'],
    ['FAIL', 'xmark.circle'],
    ['WARNING', 'exclamationmark.triangle'],
  ])

const TYPE_MAP_COLOR: Map<'INFO' | 'SUCCESS' | 'FAIL' | 'WARNING', string> =
  new Map([
    ['INFO', '#2e566f'],
    ['SUCCESS', '#2e6f40'],
    ['FAIL', '#8b0000'],
    ['WARNING', '#d5b60a'],
  ])

export default function Toast() {
  const { width } = useWindowDimensions()
  const { title, type, visible, setVisible } = useContext(ToastContext)
  const display = useSharedValue<'flex' | 'none'>('none')

  const [icon, setIcon] = useState<SFSymbol>('info.circle')
  const [color, setColor] = useState('#2e6f40')

  const handlePress = () => setVisible(false)

  useEffect(() => {
    setIcon(TYPE_MAP.get(type) || 'info.circle')
    setColor(TYPE_MAP_COLOR.get(type) || '#2e566f')
  }, [type])

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 30,
    width,
    minHeight: 70,
    opacity: withSpring(visible ? 1 : 0),
    display: display.value
  }), [width, visible, display])

  useEffect(() => {
    if (visible) {
      display.value = 'flex'
    } else {
      setTimeout(() => display.value = 'none', 1000)
    }
  }, [visible, display])

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          borderRadius: 7,
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
          flexDirection: 'row',
        }}
      >
        <IconSymbol name={icon} color="white" size={30} style={{ marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>{title}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <IconSymbol name="multiply" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}
