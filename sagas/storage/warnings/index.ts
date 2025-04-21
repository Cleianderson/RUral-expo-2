import Storage from "@react-native-async-storage/async-storage"
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects"

import Api from "@/service/Api"
import { StorageKeys } from "@/constants/StorageKeys"
import { DispatchType } from "@/constants/DispatchType"

function* updateWarnings(_warnings: WarningType[]) {
  yield put<StorageAction>({
    type: DispatchType.setWarnings,
    payload: { value: _warnings },
  })
  yield writeWarnings()
}

function* updateNewWarning(value: boolean) {
  yield put<StorageAction>({
    type: DispatchType.setNewWarning,
    payload: { value },
  })
  yield writeNewWarning()
}

function* writeWarnings() {
  const warnings = select<Select>((state) => state.mainState.warnings)

  yield call(Storage.setItem, StorageKeys.warnings, JSON.stringify(warnings))
}

function* writeNewWarning() {
  const newWarning: boolean | undefined = yield select<Select>((state) => state.mainState.newWarning)

  yield call(Storage.setItem, StorageKeys.newWarning, JSON.stringify(newWarning))
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

  let thereIsNewWarning = false
  for (let warning of warnings) {
    if (strWarningsStorage.includes(JSON.stringify(warning)) === false) {
      thereIsNewWarning = true
      break
    }
  }

  yield updateNewWarning(thereIsNewWarning)
}

export default function* watchWarnings() {
  yield takeLatest(DispatchType.getWarnings, getWarnings)
}
