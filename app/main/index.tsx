import { FlatList, ScrollView, StyleSheet, useWindowDimensions, View, ViewToken } from 'react-native';

import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@react-navigation/native';
import { Themes } from '@/constants/Theme';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Sagas } from '@/constants/Sagas';

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
  const dispatch = useDispatch()

  const { width, height } = useWindowDimensions()
  const PageFoods = useRef<FlatList<any> | null>(null)
  const [isAlmoco, setIsAlmoco] = useState(true)

  const STRING_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']

  const week = useSelector<RootState, Week | undefined>((state) => state.mainState.week)
  const day = useSelector<RootState, number | undefined>((state) => state.mainState.day)
  const favorites = useSelector<RootState, string[] | undefined>((state) => state.mainState.favorites)
  const { showIndicator, showDateOnIndicator } = useSelector<RootState, Configurations>((state) => state.mainState.configurations)


  const setDay = (num: number) => dispatch(Sagas.setDay(num))
  const addFavorites = (item: string) => dispatch(Sagas.addFavorites(item))
  const delFavorites = (item: string) => dispatch(Sagas.deleteFavorites(item))

  const viewableItemsChanged = useCallback<FlatViewableChanged>(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const _day = viewableItems[0].index
        if (typeof _day == "number") {
          setDay(_day)
        }
      }
    },
    []
  )

  const getItemLayout = (data: ArrayLike<Table> | null | undefined, index: number) => (
    { length: width, offset: width * index, index }
  )

  const _checkItem = (item: string) => {
    if (favorites === undefined) return false

    return favorites.some(favorite => favorite.toUpperCase().includes(item.toUpperCase()) || item.toUpperCase().includes(favorite.toUpperCase()))
  }


  const _favoriteOnPress = (item: string) => {
    if (_checkItem(item)) {
      const _favorites = favorites?.filter(favorite => (
        favorite.toUpperCase() === item.toUpperCase()
      ))

      for (let fav of _favorites ?? []) {
        delFavorites(fav)
      }
      return 0
    }

    return addFavorites(item)
  }

  function _getDate(inx: number) {
    let date: moment.Moment

    if (moment().add(1, 'days').isoWeek() !== moment().isoWeek()) {
      date = moment().add(1, 'days').isoWeekday(inx + 1)
    } else {
      date = moment().isoWeekday(inx + 1)
    }

    return date.format('DD/MM')
  }

  useEffect(() => {
    const color = theme.colors.primary

    navigation.setOptions({
      title: 'Início',
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
      <ThemedView style={{ flexDirection: 'row', minHeight: showIndicator ? 50 : null }}>
        {(day !== undefined && day >= 0 && showIndicator) && STRING_DAYS.map((strDay, index) => (
          <View style={{ justifyContent: 'center', flex: 1, backgroundColor: theme.colors.card }} key={index} >
            <Button
              onPress={() => PageFoods.current?.scrollToIndex({ index })}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: day - index == -1 ? 10 : 0,
                borderBottomRightRadius: day - index == 1 ? 10 : 0,
                borderTopEndRadius: day - index === 0 ? 10 : 0,
                borderTopStartRadius: day - index === 0 ? 10 : 0,
                backgroundColor: day - index === 0 ? theme.colors.card : theme.colors.unselect
              }}
            >
              <ThemedText>{strDay}</ThemedText>
              {(day === index && showDateOnIndicator) && <ThemedText>{_getDate(index)}</ThemedText>}
              {/* <IconSymbol name="heart"
                color={theme.colors.primary}
                size={10}
              /> */}
            </Button>
          </View>
        ))}
      </ThemedView>
      <FlatList
        data={week?.data}
        ref={(flatList) => (PageFoods.current = flatList)}
        // showsHorizontalScrollIndicator={Platform.OS === 'web'}
        onViewableItemsChanged={viewableItemsChanged}
        horizontal
        pagingEnabled
        getItemLayout={getItemLayout}
        initialScrollIndex={day}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={({ item }) => (
          <ThemedView style={{ flex: 1, width, height, backgroundColor: theme.colors.card }}>
            <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingBottom: 250, flexGrow: 1 }}>
              {
                Object.keys(isAlmoco ? item.almoco : item.jantar).map((key, index, _items) => {
                  const menu = isAlmoco ? item.almoco : item.jantar
                  const _itemMenu = menu[key as keyof typeof menu]

                  return (
                    <ThemedView key={index} style={{ borderColor: theme.colors.border, borderBottomWidth: 1, paddingHorizontal: 10, paddingVertical: 15, margin: 10, marginBottom: index === _items.length - 1 ? 0 : 0, flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, borderRadius: 7 }}>
                      <View style={{ backgroundColor: theme.colors.primary, width: 2, height: '100%', borderRadius: 10 }} />
                      <ThemedView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'transparent' }}>
                        <ThemedText style={{ fontWeight: '400', marginBottom: 1 }}>{menuKeys[key as keyof typeof menuKeys]}</ThemedText>
                        <ThemedText style={{ fontWeight: '600' }}>{_itemMenu}</ThemedText>
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
      <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5, backgroundColor: theme.colors.card }}>
        <Button onPress={() => setIsAlmoco(true)} style={isAlmoco ? { ...styles.navBtn, backgroundColor: theme.colors.card, borderColor: theme.colors.primary, borderWidth: 1, borderTopWidth: 0, elevation: 1 } : { ...styles.disabledNavBtn, borderTopWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.unselect }}>
          <ThemedText style={[{ paddingHorizontal: 10 }, isAlmoco ? { borderBottomColor: theme.colors.primary, borderBottomWidth: 1 } : {}]}>Almoço</ThemedText>
        </Button>
        <Button onPress={() => setIsAlmoco(false)} style={!isAlmoco ? { ...styles.navBtn, backgroundColor: theme.colors.card, borderColor: theme.colors.primary, borderWidth: 1, borderTopWidth: 0, elevation: 1 } : { ...styles.disabledNavBtn, borderTopWidth: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.unselect }}>
          <ThemedText style={[{ paddingHorizontal: 10 }, !isAlmoco ? { borderBottomColor: theme.colors.primary, borderBottomWidth: 1 } : {}]}>Janta </ThemedText>
        </Button>
      </ThemedView>
    </ThemedView >
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
