import { configureStore, Tuple } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import reducer from "@/reducers"
import storageSaga from "@/sagas/Storage"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer,
  middleware: ()=> new Tuple(sagaMiddleware),
})

sagaMiddleware.run(storageSaga)

export default store