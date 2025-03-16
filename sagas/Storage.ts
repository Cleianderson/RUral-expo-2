import { all, put, takeEvery } from "redux-saga/effects"

// import { StorageActionTypes } from "@/utils/enums"
import watchFavorites from "./storage/favorites"
// import watchMenu from "./storage/menu"
// import watchWarnings from "./storage/warnings"

function* setAcceptedNotification(action) {
// function* setAcceptedNotification(action: StorageAction) {
  yield put({ type: "" })
}

function* watchAcceptedNotification() {
  yield takeEvery('SET_ACCEPTED_NOTIFICATION', setAcceptedNotification)
  // yield takeEvery(StorageActionTypes.setAcceptedNotification, setAcceptedNotification)
}

function* storageSaga() {
  yield all([watchFavorites(), watchAcceptedNotification()])
  // yield all([watchFavorites(), watchAcceptedNotification(), watchWarnings(), watchMenu()])
}

export default storageSaga