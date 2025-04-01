import { DispatchType } from "@/constants/DispatchType";
import { put, takeLatest } from "redux-saga/effects";

function* getConfigurations() {

}

function* updateConfigurations(action: StorageAction<Configurations>) {
  yield put<StorageAction>({
    type: DispatchType.setConfigurations,
    payload: { value: action.payload?.value }
  })
}

export default function* watchConfigs() {
  yield takeLatest(DispatchType.getConfigurations, getConfigurations)
  yield takeLatest(DispatchType.updateConfigurations, updateConfigurations)
}