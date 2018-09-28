import { combineReducers } from 'redux'

import achievement from 'modules/achievement'
import achievements from 'modules/achievements'
import facebookLogin from 'modules/facebook/login'
import facebookRegistration from 'modules/facebook/registration'
import transactions from 'modules/transactions'
import uiGeneral from 'modules/ui/general'
// import uiNotifications from 'modules/ui/notifications'
import users from 'modules/users'
import walletsQtum from 'modules/wallets/qtum'

export default combineReducers({
  achievement,
  achievements,
  facebook: combineReducers({
    login: facebookLogin,
    registration: facebookRegistration
  }),
  transactions,
  ui: combineReducers({
    general: uiGeneral
    // notifications: uiNotifications
  }),
  users,
  wallets: combineReducers({
    qtum: walletsQtum
  })
})
