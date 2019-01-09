import { combineReducers } from 'redux'

import achievements from 'modules/achievements2/reducers'
import login from 'modules/login/reducers'
import transactions from 'modules/transactions/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import users from 'modules/users/reducers'
import wallets from 'modules/wallets/reducers'

export default combineReducers({
  achievements,
  login,
  transactions,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  users,
  wallets
})
