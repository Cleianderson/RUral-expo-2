import { useContext } from 'react'
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'

import ToastContext from '@/contexts/ToastContext'
import { IconSymbol } from '@/components/ui/IconSymbol'

export default function Toast() {
  const { width } = useWindowDimensions()
  const { title, setTitle, visible, setVisible, duration } = useContext(ToastContext)

  const handlePress = () => setVisible(false)

  return (
    <View style={{ position: 'absolute', top: 70, width, minHeight: 50 }}>
      <View
        style={{
          flex: 1,
          display: visible ? 'flex' : 'none',
          marginHorizontal: 20,
          borderRadius: 7,
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2e6f40',
          flexDirection: 'row',
        }}
      >
        <IconSymbol name='checkmark.circle' color='white' size={30} style={{ marginRight: 15 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }}>{title}</Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <IconSymbol name='multiply' size={25} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  )
}
