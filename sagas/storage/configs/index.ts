import Storage from '@react-native-async-storage/async-storage'

import { DispatchType } from '@/constants/DispatchType'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { StorageKeys } from '@/constants/StorageKeys'

function* getConfigurations() {
  let configurations: string | null = yield call(
    Storage.getItem,
    StorageKeys.configuration
  )

  if (configurations === null) {
    configurations = JSON.stringify({
      showDateOnIndicator: true,
      darkTheme: true,
      showIndicator: true,
    })
  }

  yield put<StorageAction>({
    type: DispatchType.setConfigurations,
    payload: { value: JSON.parse(configurations) },
  })
}

function* writeConfigurations() {
  const configurations: Configurations = yield select<Select>(
    (state) => state.mainState.configurations
  )

  // console.info(`Writing configs as ${JSON.stringify(configurations)}`)

  yield call(
    Storage.setItem,
    StorageKeys.configuration,
    JSON.stringify(configurations)
  )
}

function* updateConfigurations(action: StorageAction<Configurations>) {
  yield put<StorageAction>({
    type: DispatchType.setConfigurations,
    payload: { value: action.payload?.value },
  })

  yield writeConfigurations()
}

export default function* watchConfigs() {
  yield takeLatest(DispatchType.getConfigurations, getConfigurations)
  yield takeLatest(DispatchType.updateConfigurations, updateConfigurations)
}
