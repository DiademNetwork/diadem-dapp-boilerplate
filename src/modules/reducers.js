import { combineReducers } from 'redux'

import achievements from 'modules/achievements/reducers'
import network from 'modules/network/reducers'
import timeline from 'modules/timeline/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import wallets from 'modules/wallets/reducers'

export default combineReducers({
  achievements,
  network,
  timeline,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  wallets
})
