import { configureStore, Tuple } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"

import rootReducer from "@/reducers"
import storageSaga from "@/sagas/Storage"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: ()=> new Tuple(sagaMiddleware),
})

sagaMiddleware.run(storageSaga)

export default store