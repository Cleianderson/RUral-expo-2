import { combineReducers } from "@reduxjs/toolkit"

import { mainReducer } from "@/reducers/mainReducer"
import { requestReducer } from "@/reducers/requestReducer"
import { storageReducer } from "@/reducers/storageReducer"

const rootReducer = combineReducers({
  mainState: mainReducer,
  // requestState: requestReducer,
  // storageState: storageReducer,
})

export default rootReducer