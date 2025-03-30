import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Sagas } from '@/constants/Sagas';

export default function TabTwoScreen() {
  const { colors } = useTheme()
  const [favItem, setFavItem] = useState('')

  const favorites = useSelector<RootState, string[]>((state) => state.mainState.favorites)
  const dispatch = useDispatch()

  const addFavorites = (favItem: string) => dispatch(Sagas.addFavorites(favItem))
  const _removeItem = (favItem: string) => dispatch(Sagas.deleteFavorites(favItem))

  // const [favorites, setFavorites] = useState(['UVA', 'BIFE'])

  // const _removeItem = (item: string) => {
  //   const _favorites = favorites.filter(favorite => favorite !== item)

  //   setFavorites(_favorites)
  // }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <IconSymbol
            size={200}
            color={colors.primary}
            name="heart.fill"
            style={styles.headerImage}
          />
        }>
        {favorites && favorites.map((favorite, index) => (
          <ThemedView key={index} style={{ backgroundColor: colors.card, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 7, flexDirection: 'row' }}>
            <ThemedView style={{ flex: 1, backgroundColor: 'transparent' }}>
              <ThemedText style={{ fontSize: 16, marginRight: 5 }}>{favorite}</ThemedText>
            </ThemedView>
            <ThemedView style={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
              <Button onPress={() => _removeItem(favorite)}>
                <IconSymbol name='trash' color={colors.primary} />
              </Button>
            </ThemedView>
          </ThemedView>
        ))}
      </ParallaxScrollView>
      {/* <ThemedView style={{ flexDirection: 'row' }}>
        <TextInput label='Adicionar' containerStyle={{ flex: 1 }} value={favItem} onChangeText={setFavItem} />
        <Button style={{ width: 100 }} onPress={() => addFavorites(favItem)}><ThemedText>+</ThemedText></Button>
      </ThemedView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -40,
    left: -15,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
