import { combineReducers } from 'redux'

import achievementsChain from 'modules/achievements/chain/reducers'
import achievementsList from 'modules/achievements/list/reducers'
import login from 'modules/login/reducers'
import registration from 'modules/registration/reducers'
import transactions from 'modules/transactions/reducers'
import uiGeneral from 'modules/ui/general/reducers'
import uiNotifications from 'modules/ui/notifications/reducers'
import users from 'modules/users/reducers'
import wallets from 'modules/wallets/reducers'

export default combineReducers({
  achievements: combineReducers({
    chain: achievementsChain,
    list: achievementsList
  }),
  login,
  registration,
  transactions,
  ui: combineReducers({
    general: uiGeneral,
    notifications: uiNotifications
  }),
  users,
  wallets
})
