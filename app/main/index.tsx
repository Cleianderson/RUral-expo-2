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
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

type FlatViewableChanged = (info: {
  viewableItems: Array<ViewToken>
  changed: Array<ViewToken>
}) => void

const menuMap = new Map([
  ["p1", "Prato Principal 1"],
  ["p2", "Prato Principal 2"],
  ["gre", "Na Grelha"],
  ["fag", "Fast Grill"],
  ["veg", "Vegetariano"],
  ["gua", "Guarnição"],
  ["sal", "Salada Crua"],
  ["sco", "Salada Cozida"],
  ["sopa", "Sopa"],
  ["sob", "Sobremesa"],
  ["suc", "Suco"]
])


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
  const s = useSelector<RootState, any>(state => state.mainState.isRequesting)
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
      const sanitizedItem = item.toUpperCase().trim()
      const matchingFavorite = favorites?.find(favorite => {
        const sanitizedFav = favorite.toUpperCase().trim()
        return (
          sanitizedFav === sanitizedItem ||
          sanitizedFav.includes(sanitizedItem) ||
          sanitizedItem.includes(sanitizedFav)
        )
      })

      if (matchingFavorite) {
        delFavorites(matchingFavorite)
      }
    } else {
      addFavorites(item)
    }
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
          {/* <Button onPress={() => router.push("/warnings")}>
            <IconSymbol name="bell.fill" color={color} />
          </Button> */}
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

  if (day === undefined || (week?.data.length ?? -1) === 0) {
    return (
      <View style={{ flex: 1, width, justifyContent: "center", alignItems: "center" }}>
        <ThemedView style={{ alignItems: 'center' }}>
          <Svg
            // xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 135.467 135.467"
          >
            <G transform="translate(0 -161.533)">
              <Path
                fill="#b8c4f0"
                d="M43.97 191.624a3.208 3.208 0 0 0-3.872 2.385l-15.74 66.229a3.208 3.208 0 0 0 2.385 3.871l50.923 12.103a3.208 3.208 0 0 0 3.872-2.385l15.74-66.229a3.208 3.208 0 0 0-2.386-3.872z"
              />
              <Path
                fill="#4c5a80"
                d="M24.142 188.811a3.208 3.208 0 0 0-2.788 3.593l8.522 67.538a3.208 3.208 0 0 0 3.593 2.787l51.929-6.552a3.208 3.208 0 0 0 2.787-3.593l-8.521-67.537a3.208 3.208 0 0 0-3.593-2.788z"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={218.994}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={1.863}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={235.329}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={210.827}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={218.994}
                fill="#9a9a9a"
                ry={0.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={243.497}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={251.664}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Rect
                width={21.015}
                height={3.299}
                x={30.094}
                y={227.162}
                fill="#9a9a9a"
                ry={1.65}
                transform="rotate(-7.191)"
              />
              <Circle cx={77.582} cy={226.562} r={23.974} fill="#b7d6dfc5" />
              <Path
                fill="#6387ca"
                d="M77.513 200.423a26.002 26.002 0 0 0-26.002 26.002 26.002 26.002 0 0 0 26.002 26.001 26.002 26.002 0 0 0 26.001-26.001 26.002 26.002 0 0 0-26.001-26.002zm0 5.62a20.381 20.381 0 0 1 20.38 20.382 20.381 20.381 0 0 1-20.38 20.38 20.381 20.381 0 0 1-20.382-20.38 20.381 20.381 0 0 1 20.382-20.381z"
              />
              <Path
                fill="#6387ca"
                d="M89.095 246.593s10.044 23.083 20.505 23.878c1.98.15 4.367-1.9 4.517-3.879.767-10.09-19.778-23.03-19.778-23.03z"
              />
            </G>
          </Svg>
          <ThemedText style={{ fontSize: 16 }}>Cardápio não encontrado.</ThemedText>
        </ThemedView>
      </View>
    )
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      {<ThemedView style={{ flexDirection: 'row', minHeight: showIndicator ? 50 : null }}>
        {(showIndicator) && STRING_DAYS.map((strDay, index) => (
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
      </ThemedView>}
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
            <FlatList
              data={Array.from(menuMap.keys())} // Use keys as data
              keyExtractor={(key) => key} // Ensure unique keys
              contentContainerStyle={{ paddingBottom: 250, flexGrow: 1 }}
              renderItem={({ item: key, index }) => {
                const menu = isAlmoco ? item.almoco : item.jantar
                const _itemMenu = menu[key as keyof typeof menu]

                if (isAlmoco && key === 'sopa') {
                  return null
                }
                if (!isAlmoco && key === 'sco') {
                  return null
                }

                return (
                  <ThemedView
                    key={index}
                    style={{
                      borderColor: theme.colors.border,
                      borderBottomWidth: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                      margin: 10,
                      marginBottom: index === Object.keys(menu).length - 1 ? 0 : 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: theme.colors.card,
                      borderRadius: 7,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: theme.colors.primary,
                        width: 2,
                        height: '100%',
                        borderRadius: 10,
                      }}
                    />
                    <ThemedView
                      style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <ThemedText style={{ fontWeight: '400', marginBottom: 1 }}>
                        {menuMap.get(key)}
                      </ThemedText>
                      <ThemedText style={{ fontWeight: '600' }}>{_itemMenu}</ThemedText>
                    </ThemedView>
                    <Button onPress={() => _favoriteOnPress(_itemMenu)}>
                      <IconSymbol
                        name={_checkItem(_itemMenu) ? 'heart.fill' : 'heart'}
                        color={theme.colors.primary}
                      />
                    </Button>
                  </ThemedView>
                )
              }}
            />
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
