import { useTheme } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Sagas } from '@/constants/Sagas'

export default function TabTwoScreen() {
  const { colors } = useTheme()
  const [favItem, setFavItem] = useState('')
  const scrollRef = useRef<ScrollView | null>(null)

  const favorites = useSelector<RootState, string[]>(
    (state) => state.mainState.favorites
  )
  const dispatch = useDispatch()

  const addFavorites = (favItem: string) =>
    dispatch(Sagas.addFavorites(favItem))
  const _removeItem = (favItem: string) =>
    dispatch(Sagas.deleteFavorites(favItem))

  const handleAddFavorite = () => {
    if (favItem.length > 0) {
      addFavorites(favItem)
      setFavItem('')
      scrollRef.current?.scrollToEnd()
    }
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ gap: 16, padding: 32, overflow: 'hidden' }}
      >
        {favorites &&
          favorites.map((favorite, index) => (
            <ThemedView
              key={index}
              style={{
                backgroundColor: colors.card,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 7,
                flexDirection: 'row',
              }}
            >
              <ThemedView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <ThemedText style={{ fontSize: 16, marginRight: 5 }}>
                  {favorite}
                </ThemedText>
              </ThemedView>
              <ThemedView
                style={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                }}
              >
                <Button onPress={() => _removeItem(favorite)}>
                  <IconSymbol name="trash" color={colors.primary} />
                </Button>
              </ThemedView>
            </ThemedView>
          ))}
      </ScrollView>
      <ThemedView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          label=""
          containerStyle={{
            flex: 1,
            borderWidth: 0,
            backgroundColor: 'transparent',
            padding: 0,
            margin: 0,
            marginRight: 5,
          }}
          style={{
            borderWidth: 1,
            backgroundColor: colors.card,
            borderRadius: 30,
            borderColor: colors.border,
            color: colors.text,
            paddingVertical: 15,
            paddingHorizontal: 15,
            maxHeight: 100,
          }}
          multiline
          placeholder="Item"
          value={favItem}
          onChangeText={setFavItem}
          onFocus={() => scrollRef.current?.scrollToEnd()}
        />
        <Button
          onPress={handleAddFavorite}
          style={{
            borderRadius: 30,
            padding: 10,
            backgroundColor: colors.primary,
            marginBottom: 8,
          }}
        >
          <IconSymbol name="plus" size={24} color={colors.background} />
        </Button>
      </ThemedView>
    </ThemedView>
  )
}
