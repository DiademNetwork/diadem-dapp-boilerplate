import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import achievements from 'modules/achievements/reducers'
import network from 'modules/network/reducers'
import timeline from 'modules/timeline/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import wallets from 'modules/wallets/reducers'

export default (history) => combineReducers({
  achievements,
  network,
  timeline,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  router: connectRouter(history),
  wallets
})
