import { combineReducers } from 'redux'

import achievement from 'modules/achievement/reducers'
import achievements from 'modules/achievements/reducers'
import facebookLogin from 'modules/facebook/login/reducers'
import facebookRegistration from 'modules/facebook/registration/reducers'
import transactions from 'modules/transactions/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import users from 'modules/users/reducers'
import walletsQtum from 'modules/wallets/qtum/reducers'

export default combineReducers({
  achievement,
  achievements,
  facebook: combineReducers({
    login: facebookLogin,
    registration: facebookRegistration
  }),
  transactions,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  users,
  wallets: combineReducers({
    qtum: walletsQtum
  })
})
