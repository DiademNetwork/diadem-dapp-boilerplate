import { combineReducers } from 'redux'

import achievements from 'modules/achievements/reducers'
import login from 'modules/login/reducers'
import timeline from 'modules/timeline/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import users from 'modules/users/reducers'
import wallets from 'modules/wallets/reducers'

export default combineReducers({
  achievements,
  login,
  timeline,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  users,
  wallets
})
