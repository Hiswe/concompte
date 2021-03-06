import crio from 'crio'

import createActionNames from './utils/create-action-names'
import dispatchFetchActions from './utils/dispatch-fetch-actions'

const NAME = `account`

export const AUTH = createActionNames(NAME, `get`, `auth`)
export const GET_ONE = createActionNames(NAME, `get`, `one`)
export const STATISTICS = createActionNames(NAME, `get`, `statistics`)
export const LOGIN = createActionNames(NAME, `post`, `login`)
export const FORGOT = createActionNames(NAME, `post`, `forgot`)
export const SET_PASSWORD = createActionNames(NAME, `post`, `set-password`)
export const RESET = createActionNames(NAME, `post`, `reset`)
export const LOGOUT = createActionNames(NAME, `get`, `logout`)
export const REGISTER = createActionNames(NAME, `post`, `register`)
export const SAVE_ONE = createActionNames(NAME, `post`, `one`)

const initialState = crio({
  isSaving: false,
  isAuthenticated: false,
  user: {},
  statistics: {},
})

//////
// REDUCER
//////

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AUTH.SUCCESS:
    case LOGIN.SUCCESS:
    case SET_PASSWORD.SUCCESS:
    case RESET.SUCCESS:
      state = state.set(`isAuthenticated`, true)
      return state.set(`user`, payload.user)

    case AUTH.ERROR:
    case LOGOUT.SUCCESS:
      state = state.set(`isAuthenticated`, false)
      return state.set(`user`, {})

    case STATISTICS.SUCCESS:
      return state.set(`statistics`, payload)

    case SAVE_ONE.LOADING:
      return state.set(`isSaving`, true)
    case SAVE_ONE.DONE:
      return state.set(`isSaving`, false)
    case SAVE_ONE.SUCCESS:
      return state.set(`user`, payload.user)

    default:
      return state
  }
}

//////
// ACTION CREATORS
//////

export const auth = (params, jwt) => async dispatch => {
  const options = {
    url: `/${NAME}/auth`,
  }
  await dispatchFetchActions({
    dispatch,
    actions: AUTH,
    fetch: { options, jwt },
  })
}

export const getOne = (params, jwt) => async dispatch => {
  const options = {
    url: `/${NAME}/auth`,
  }
  await dispatchFetchActions({
    dispatch,
    actions: GET_ONE,
    fetch: { options, jwt },
  })
}

export const statistics = (params, jwt) => async dispatch => {
  const options = {
    url: `/${NAME}/statistics`,
  }
  await dispatchFetchActions({
    dispatch,
    actions: STATISTICS,
    fetch: { options, jwt },
  })
}

export const login = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${NAME}/login`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: LOGIN,
    fetch: { options, jwt },
  })
}

export const logout = (params, jwt) => async dispatch => {
  const options = {
    url: `/${NAME}/logout`,
  }
  await dispatchFetchActions({
    dispatch,
    actions: LOGOUT,
    fetch: { options, jwt },
  })
}

export const register = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${NAME}/register`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: REGISTER,
    fetch: { options, jwt },
  })
}

export const forgot = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${NAME}/forgot`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: FORGOT,
    fetch: { options, jwt },
  })
}

export const setPassword = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${NAME}/set-password`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: SET_PASSWORD,
    fetch: { options, jwt },
  })
}

export const reset = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `/${NAME}/reset`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: RESET,
    fetch: { options, jwt },
  })
}

export const updateSettings = (params, jwt) => async dispatch => {
  const { body } = params
  const options = {
    url: `${NAME}/settings`,
    body,
  }
  await dispatchFetchActions({
    dispatch,
    actions: SAVE_ONE,
    fetch: { options, jwt },
  })
}
