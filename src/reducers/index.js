import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import achievements from './achievements'
import facebook from './facebook'
import userTransactions from './user-transactions'
import wallet from './wallet'

export default combineReducers({
  achievements,
  facebook,
  notifications,
  userTransactions,
  wallet
})
