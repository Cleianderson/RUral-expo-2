interface Action {
  type: string
  payload: { data: any; value: any }
}

type Reduce = (
  state: typeof initialState,
  action: Action
) => typeof initialState

const initialState: MainState = {
  warns: [],
  foods: undefined,
  day: undefined,
  homeView: undefined,
  thereIsWarn: false,
  acceptedNotification: undefined,
  configurations: {
    showIndicator: true,
    showDateOnIndicator: true,
    darkTheme: true,
    colorScheme: null
  },
  favorites: [],
  isOnboarded: undefined,
  isAppReady: false,
  menu: [],
  week: undefined,
  newWarning: undefined,
  questions: [],
  warnings: [],
  howManyWarns: null
}

export const mainReducer: Reduce = (state = initialState, action) => {
  const SET_DAY: Reduce = (state, action) => ({
    ...state,
    day: action.payload.value,
  })

  const SET_FOODS: Reduce = (state, action) => ({
    ...state,
    foods: action.payload.value,
  })

  const SET_WEEK: Reduce = (state, action) => ({
    ...state,
    week: action.payload.value,
  })

  const SET_WARNINGS: Reduce = (state, action) => ({
    ...state,
    warnings: action.payload.value,
  })

  const SET_THERE_IS_WARN: Reduce = (state, action) => ({
    ...state,
    thereIsWarn: action.payload.value,
  })

  const SET_HOME_VIEW: Reduce = (state, action) => ({
    ...state,
    homeView: action.payload.value,
  })

  const REMOVE_FAVORITES: Reduce = (state, action) => {
    const favs = state.favorites?.filter((fav) => fav !== action.payload.value)
    return { ...state, favorites: favs }
  }

  const SET_ACCEPTED_NOTIFICATION: Reduce = (state, action) => {
    const _state = { ...state, acceptedNotification: action.payload.value }
    return _state
  }

  const SET_CONFIGURATIONS: Reduce = (state, action) => {
    const _state = {
      ...state,
      configurations: { ...state.configurations, ...action.payload.value },
    }
    return _state
  }

  const SET_FAVORITES: Reduce = (state, action) => {
    const _state = { ...state, favorites: action.payload.value }
    return _state
  }

  const SET_IS_ONBOARDED: Reduce = (state, action) => {
    return state

  }
  const SET_IS_APP_READY: Reduce = (state, action) => {
    console.info(`Setting isAppReady to ${action.payload.value}`)
    return { ...state, isAppReady: action.payload.value }
  }

  const SET_MENU: Reduce = (state, action) => {
    return state
  }

  const SET_NEW_WARNING: Reduce = (state, action) => {
    const _state = { ...state, newWarning: action.payload.value }
    return _state
  }

  const SET_QUESTIONS: Reduce = (state, action) => {
    return state
  }

  const SET_HOW_MANY_WARNS: Reduce = (state, action) => {
    return { ...state, howManyWarns: action.payload.value }
  }

  const actions = {
    SET_DAY,
    SET_FOODS,
    SET_WEEK,
    SET_THERE_IS_WARN,
    SET_HOME_VIEW,
    REMOVE_FAVORITES,
    SET_ACCEPTED_NOTIFICATION,
    SET_CONFIGURATIONS,
    SET_FAVORITES,
    SET_IS_ONBOARDED,
    SET_IS_APP_READY,
    SET_MENU,
    SET_NEW_WARNING,
    SET_QUESTIONS,
    SET_WARNINGS,
    SET_HOW_MANY_WARNS,
  }

  let fn_action = actions[action.type as keyof typeof actions]
  if (fn_action === undefined) {
    fn_action = (state, action) => state
  }

  return fn_action(state, action)
}
