import { FlatList, Platform, ScrollView, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';

import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@react-navigation/native';
import { Themes } from '@/constants/Theme'
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';

type FlatViewableChanged = (info: {
  viewableItems: Array<ViewToken>
  changed: Array<ViewToken>
}) => void

const menuKeys = {
  "p1": "Prato Principal 1",
  "p2": "Prato Principal 2",
  "gre": "Na Grelha",
  "fag": "Fast Grill",
  "veg": "Vegetariano",
  "gua": "Guarnição",
  "sal": "Salada Crua",
  "sco": "Salada Cozida",
  "sopa": "Sopa",
  "sob": "Sobremesa",
  "suc": "Suco"
}

export default function HomeScreen() {
  const navigation = useNavigation()
  const router = useRouter()
  const theme = useTheme() as typeof Themes.dark | typeof Themes.light

  const { width, height } = useWindowDimensions()
  const PageFoods = useRef<FlatList<any> | null>(null)
  const [isAlmoco, setIsAlmoco] = useState(true)
  const [favorites, setFavorites] = useState(['berinjela', 'bife', 'frango'])

  const day = 0
  const week = {
    "_id": "67cee120eb392a014d2846a7",
    "data": [
      {
        "almoco": {
          "p1": "BIFE DE PANELA",
          "p2": "BIFE",
          "gre": "ISCA DE CARNE ACEBOLADA",
          "fag": "FESTIVAL DE MASSAS",
          "veg": "BERINJELA À \nPARMEGINA (CONTÉM\nOVOS, LEITE E \nDERIVADOS) BERINJELA\nÀ MILANESA",
          "gua": "ABOBRINHA REFOGADA-ARROZ COM ERVILHAS-FEIJÃO CARIOCA",
          "sal": "MIX DE FOLHAS COM MILHO VERDE",
          "sco": "CENOURA COM VAGEM",
          "sob": "MELANCIA",
          "suc": "UVA/TANGERINA"
        },
        "jantar": {
          "p1": "FRANGO GRELHADO ACEBOLADO",
          "p2": "ESCONDIDINHO DE ABÓBORA COM CHARQUE",
          "gre": "FRANGO AO FORNO COM ERVAS",
          "veg": "STROGONOFF DE GRÃO DE\nBICO (CONTÉM LEITE E\nERIVADOS) / BOBÓ DE \nGRÃO DE\nBICO",
          "fag": "CROQUETE DE FRANGO",
          "gua": "ARROZ REFOGADO",
          "sopa": "SOPA CREME DE CEBOLA",
          "sal": "SALADA DE ACELGA C/ TOMATE",
          "sob": "MELANCIA",
          "suc": "UVA/TANGERINA"
        }
      },
      {
        "almoco": {
          "p1": "FRANGO GRELHADO COM ALHO FRITO",
          "p2": "ALMÔNDEGAS AO MOLHO CONCASSÊ",
          "gre": "PEITO DE FRANGO AO VINAGRETE",
          "fag": "FRANGO, OVOS E BATATA FRITAS",
          "veg": "ALMÔNDEGAS ",
          "gua": "ESPAGUETE- ARROZ COM CEBOLINHO- FEIJÃO PRETO",
          "sal": "FOLHAS COM TOMATE E PEPINO",
          "sco": "ABÓBORA COM CEBOLA ROXA",
          "sob": "COMPOTA DE BANANA",
          "suc": "ACEROLA/ ABACAXI COM HORTELÃ"
        },
        "jantar": {
          "p1": "COPA LOMBO COM ABACAXI",
          "p2": "BOBÓ DE FRANGO",
          "gre": "BIFE GRELHADO COM CEBOLA ROXA AGRIDOCE",
          "veg": "CROQUETE DE BATATA DOCE",
          "fag": "BAIÃO DE DOIS",
          "gua": "BATATA DOCE",
          "sopa": "MUNGUZÁ",
          "sal": "MIX DE FOLHAS COM FRUTAS",
          "sob": "COMPOTA DE BANANA",
          "suc": "ACEROLA/ ABACAXI COM HORTELÃ"
        }
      },
      {
        "almoco": {
          "p1": "PERNIL COM CEBOLA ROXA AGRIDOCE",
          "p2": "FRANGO À LÁ KING",
          "gre": "PEIXE COM ABÓBORA",
          "fag": "RISOTO",
          "veg": "NHOQUE VEGETARIANO\nCOM BOLONHESA DE\nLENTILHA (CONTÉM\nLEITE E DERIVADOS)\nNHOQUE \nVEGANO",
          "gua": "LEGUMES SAUTÉ- ARROZ CARIOCA- FEIJÃO CARIOCA",
          "sal": "SALADA ARCO IRIS",
          "sco": "ABOBRINHA COM ERVAS",
          "sob": "MAMÃO",
          "suc": "MANGA/ LIMÃO"
        },
        "jantar": {
          "p1": "FRANGO AO FORNO COM AVEIA",
          "p2": "BIFE AO MOLHO FERRUGEM",
          "gre": "FRANGO COM PURÊ DE BATATA DOCE",
          "veg": "ESCONDIDINHO DE SOJA\n(CONTÉM LEITE E\nDERIVADOS)\nESCONDIDINHO\nVEGANO",
          "fag": "FRANGO À PARMEGIANA",
          "gua": "CUSCUZ",
          "sopa": "SOPA DE ABÓBORA",
          "sal": "MIX DE FOLHAS COM CEBOLA ROXA",
          "sob": "MAMÃO",
          "suc": "MANGA/ LIMÃO"
        }
      },
      {
        "almoco": {
          "p1": "FILÉ DE FRANGO COM ERVAS",
          "p2": "PICADINHO AO MOLHO MADEIRA",
          "gre": "FRANGO AO FORNO COM BATATA DOCE RÚSTICA",
          "fag": "LASANHA DE FRANGO",
          "veg": "DOBRADINHA VEGETARIANA",
          "gua": "CHUCHU GRATINADO- ARROZ COM CENOURA- FEIJÃO PRETO",
          "sal": "MIX DE FOLHAS COM LARANJA",
          "sco": "SALADA NORDESTINA",
          "sob": "CREME ROSÊ",
          "suc": "TAMARINDO/ GOIABA"
        },
        "jantar": {
          "p1": "FIGADO À LISBOETA",
          "p2": "FRANGO AO VINAGRETE",
          "gre": "GUISADINHO COM LEGUMES",
          "veg": "ACARAJÉ ",
          "fag": "CHEESEBURGUER COM FRITAS",
          "gua": "MACAXEIRA",
          "sopa": "CANJA",
          "sal": "PEPINO AGRIDOCE",
          "sob": "CREME ROSÊ",
          "suc": "TAMARINDO/ GOIABA"
        }
      },
      {
        "almoco": {
          "p1": "DOBRADINHA",
          "p2": "FRANGO AO FORNO COM ABACAXI",
          "gre": "ISCA DE CARNE COM LEGUMES",
          "fag": "ARRUMADINHO",
          "veg": "QUICHE DE CEBOLA\n(CONTÉM LEITE E\nDERIVADOS) TOMATE\nRECHEADA\nVEGANA",
          "gua": "FAROFA DOURADA- ARROZ BRANCO- FEIJÃO CARIOCA",
          "sal": "SALADA AMERICANA",
          "sco": "SALADA DE LEGUMES",
          "sob": "LARANJA",
          "suc": "GRAVIOLA/ CAJU"
        },
        "jantar": {
          "p1": "FILÉ DE FRANGO GRELHADO COM ERVILHAS",
          "p2": "SILVEIRINHA DE CARNE MOIDA",
          "gre": "PEIXE COM GERGELIM",
          "veg": "LASANHA VEGETARIANA\n(CONTÉM LEITE E\nDERIVADOS) / LASANHA\nVEGANA",
          "fag": "FRANGO À KIEV",
          "gua": "ESPAGUETE",
          "sopa": "SOPA DE LEGUMES",
          "sal": "REPOLHO BICOLOR COM FRUTAS",
          "sob": "LARANJA",
          "suc": "GRAVIOLA/ CAJU"
        }
      }
    ],
    "number_week": 11,
    "year": 2025,
    "createdAt": "2025-03-10T12:54:56.590Z",
    "updatedAt": "2025-03-10T12:54:56.590Z",
    "__v": 0
  }

  const viewableItemsChanged = useCallback<FlatViewableChanged>(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const _day = viewableItems[0].index
        if (typeof _day == "number") {
          // setDay(_day)
        }
      }
    },
    []
  )

  const getItemLayout = (data: ArrayLike<Table> | null | undefined, index: number) => (
    { length: width, offset: width * index, index }
  )

  const _checkItem = (item: string) => (
    favorites.some(favorite => favorite.toUpperCase().includes(item.toUpperCase()) || item.toUpperCase().includes(favorite.toUpperCase()))
  )

  const _favoriteOnPress = (item: string) => {
    if (_checkItem(item)) {
      const _favorites = favorites.filter(favorite => (
        favorite.toUpperCase() !== item.toUpperCase() || item.toUpperCase().includes(favorite.toUpperCase()) === false
      ))

      return setFavorites(_favorites)
    }

    return setFavorites([item, ...favorites])
  }

  useEffect(() => {
    const color = theme.colors.primary

    navigation.setOptions({
      title: 'RUral',
      headerShown: true,
      headerLeft: () => undefined,
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 130,
            justifyContent: "space-around",
          }}
        >
          <Button onPress={() => router.push("/warnings")}>
            <IconSymbol name="bell.fill" color={color} />
          </Button>
          <Button onPress={() => { }}>
            <IconSymbol name="arrow.counterclockwise" color={color} />
          </Button>
          <Button onPress={() => router.push("/configs")}>
            <IconSymbol name="gear" color={color} />
          </Button>
        </View>
      )
    })
  }, [navigation, theme, theme.colors])

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={week?.data}
        ref={(flatList) => (PageFoods.current = flatList)}
        // showsHorizontalScrollIndicator={Platform.OS === 'web'}
        horizontal
        pagingEnabled
        getItemLayout={getItemLayout}
        initialScrollIndex={day}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={({ item }) => (
          <ThemedView style={{ flex: 1, width, height }}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 110, flexGrow: 1 }}>
              {
                Object.keys(isAlmoco ? item.almoco : item.jantar).map((key, index, _items) => {
                  const menu = isAlmoco ? item.almoco : item.jantar
                  const _itemMenu = menu[key as keyof typeof menu]

                  return (
                    <ThemedView key={index} style={{ padding: 10, paddingVertical: 10, paddingBottom: index === _items.length - 1 ? 0 : 20, flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ backgroundColor: theme.colors.primary, width: 3, height: '100%', borderRadius: 10 }} />
                      <ThemedView style={{ flex: 1, paddingHorizontal: 10 }}>
                        <ThemedText style={{ fontWeight: '400', marginBottom: 1 }}>{menuKeys[key as keyof typeof menuKeys]}</ThemedText>
                        <ThemedText style={{ fontWeight: 'bold' }}>{_itemMenu}</ThemedText>
                      </ThemedView>
                      <Button onPress={() => _favoriteOnPress(_itemMenu)}>
                        <IconSymbol name={_checkItem(_itemMenu) ? 'heart.fill' : 'heart'} color={theme.colors.primary} />
                      </Button>
                    </ThemedView>)
                })
              }
            </ScrollView>
          </ThemedView>
        )}
      />
      <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button onPress={() => setIsAlmoco(true)} style={isAlmoco ? {...styles.navBtn, backgroundColor: theme.colors.background, borderColor: theme.colors.primary, borderWidth: 1, borderTopWidth: 0, elevation: 1} : {...styles.disabledNavBtn, borderTopWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.unselect}}>
          <ThemedText>Almoço</ThemedText>
        </Button>
        <Button onPress={() => setIsAlmoco(false)} style={!isAlmoco ? {...styles.navBtn, backgroundColor: theme.colors.background, borderColor: theme.colors.primary, borderWidth: 1, borderTopWidth: 0, elevation: 1} : {...styles.disabledNavBtn, borderTopWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.unselect}}>
          <ThemedText>Jantar</ThemedText>
        </Button>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  navBtn: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'green'
  },
  disabledNavBtn: {
    flex: 1,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'red'

  }
});
