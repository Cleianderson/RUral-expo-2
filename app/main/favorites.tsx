import { StyleSheet, Image, Platform, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Button from '@/components/Button';

export default function TabTwoScreen() {
  const { colors } = useTheme()
  const [favorites, setFavorites] = useState(['UVA', 'BIFE'])

  const _removeItem = (item: string) => {
    const _favorites = favorites.filter(favorite => favorite !== item)

    setFavorites(_favorites)
  }

  return (
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
      {favorites.map((favorite, index) => (
        <ThemedView key={index} style={{ backgroundColor: colors.card, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 7, flexDirection: 'row' }}>
          <ThemedView style={{ flex: 1, backgroundColor: 'transparent' }}>
            <ThemedText style={{ fontSize: 16 }}>{favorite}</ThemedText>
          </ThemedView>
          <ThemedView style={{ backgroundColor: 'transparent' }}>
            <Button onPress={() => _removeItem(favorite)}>
              <IconSymbol name='trash' color={colors.primary} />
            </Button>
          </ThemedView>
        </ThemedView>
      ))}
    </ParallaxScrollView>
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
