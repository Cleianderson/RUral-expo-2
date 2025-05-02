import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeLatest } from "redux-saga/effects"

import Api from "@/service/Api"
import { StorageKeys } from "@/constants/StorageKeys"
import { DispatchType } from "@/constants/DispatchType"

function* updateWarnings(_warnings: WarningType[]) {
  yield put<StorageAction>({
    type: DispatchType.setWarnings,
    payload: { value: _warnings },
  })
  // yield writeWarnings()
}

// function* updateNewWarning(value: boolean) {
//   yield put<StorageAction>({
//     type: DispatchType.setNewWarning,
//     payload: { value },
//   })
//   yield writeNewWarning()
// }
function* updateHowManyWarning(value: number | null) {
  yield put<StorageAction>({
    type: DispatchType.setHowManyWarns,
    payload: { value },
  })
  yield writeHowManyWarning(value)
}

function* writeWarnings() {
  const warnings: WarningType[] = yield select<Select>((state) => state.mainState.warnings)

  yield call(Storage.setItem, StorageKeys.warnings, JSON.stringify(warnings))
}

function* writeHowManyWarning(value: number | null) {
  yield call(Storage.setItem, StorageKeys.newWarning, JSON.stringify(value))
  yield writeWarnings()
}

function* getWarnings() {
  try {
    const warnsResolve: { data: WarningType[] } = yield call(Api.get, "/warn")

    yield updateWarnings(warnsResolve?.data ?? [])
    yield checkNewWarnings()
  } catch {
    // pass
  }
}

function* checkNewWarnings() {
  const warnings: WarningType[] = yield select<Select>((state) => state.mainState.warnings)
  const strWarningsStorage: string = yield call(Storage.getItem, StorageKeys.warnings)
  const strHowManyWarning: string = yield call(Storage.getItem, StorageKeys.newWarning)

  // let thereIsNewWarning = false
  let howManyWarns: number | null = 0
  if (JSON.parse(strHowManyWarning) !== null) {
    howManyWarns = JSON.parse(strHowManyWarning) as number
  }

  for (let warning of warnings) {
    if (strWarningsStorage.includes(JSON.stringify(warning)) === false) {
      howManyWarns += 1
    }
  }

  howManyWarns = howManyWarns > 0 ? howManyWarns : null
  // yield updateNewWarning(thereIsNewWarning)
  yield updateHowManyWarning(howManyWarns)
}

function* clearHowManyWarnings() {
  yield updateHowManyWarning(null)
}

export default function* watchWarnings() {
  yield takeLatest(DispatchType.getWarnings, getWarnings)
  yield takeLatest(DispatchType.clearHowManyWarning, clearHowManyWarnings)
}
