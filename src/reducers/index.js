import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux'
import achievements from './achievements'
import facebook from './facebook'
import transactions from './transactions'
import wallet from './wallet'
import ui from './ui'

export default combineReducers({
  achievements,
  facebook,
  notifications,
  transactions,
  ui,
  wallet
})
