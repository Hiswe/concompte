import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'
import notifications from './notifications'
import user, { LOGOUT } from './user'

const appReducer = combineReducers({
  customers,
  quotations,
  notifications,
  user,
})

// make a global reducer
// • this will allow us to manipulate all the state for logout
//   https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
const rootReducer = (state, action) => {
  if (action.type === LOGOUT) state = void 0
  return appReducer(state, action)
}

export default rootReducer
