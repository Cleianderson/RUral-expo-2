import Storage from "@react-native-async-storage/async-storage"
import { DispatchType } from "@/constants/DispatchType"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"
import { StorageKeys } from "@/constants/StorageKeys"
// import { DispatchType, StorageKeys } from "~/utils/enums"

function* updateFavorites(_favorites: string[]) {
  yield put<StorageAction>({
    type: DispatchType.setFavorites,
    payload: { value: _favorites },
  })
  yield writeFavorites(_favorites)
}

function* writeFavorites(favorites: string[]) {
  // const favorites: string[] = yield select<Select>((state) => state.storageState.favorites)

  yield call(Storage.setItem, StorageKeys.favorites, JSON.stringify(favorites || []))
}

function* getFavorites() {
  const strFavorites: string = yield call(Storage.getItem, StorageKeys.favorites)

  // console.log(strFavorites)

  const favorites = JSON.parse(strFavorites || '[]')
  yield updateFavorites(favorites)
}

// function* addFavorites(action) {
function* addFavorites(action: StorageAction<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.mainState.favorites)

  if (action.payload === undefined) return

  let favorites = [...currentFavorites, action.payload.value]
  favorites = favorites.map((fav) => fav.toUpperCase().trim())

  // console.info(favorites)

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

// function* delFavorites(action) {
function* delFavorites(action: StorageAction<string>) {
  const currentFavorites: string[] = yield select<Select>((state) => state.mainState.favorites)

  if (action.payload === undefined) return

  let favorites = currentFavorites.filter(
    (fav) => fav.toUpperCase() !== action.payload!.value.toUpperCase()
  )

  yield updateFavorites(favorites)
  // yield writeFavorites(favorites)
}

export default function* watchFavorites() {
  yield takeLatest(DispatchType.getFavorites, getFavorites)
  yield takeEvery(DispatchType.addFavorites, addFavorites)
  yield takeEvery(DispatchType.delFavorites, delFavorites)
}