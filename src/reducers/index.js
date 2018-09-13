import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import achievements from './achievements'
import facebook from './facebook'
import transactions from './transactions'
import ui from './ui'
import users from './users'
import wallet from './wallet'

export default combineReducers({
  achievements,
  facebook,
  notifications,
  transactions,
  ui,
  users,
  wallet
})
