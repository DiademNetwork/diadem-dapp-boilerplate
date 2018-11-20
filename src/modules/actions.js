import achievementChain from 'modules/achievements/chain/actions'
import achievementsList from 'modules/achievements/list/actions'
import login from 'modules/login/actions'
import registration from 'modules/registration/actions'
import transactions from 'modules/transactions/actions'
import uiGeneral from 'modules/ui/general/actions'
import uiNotifications from 'modules/ui/notifications/actions'
import users from 'modules/users/actions'
import wallets from 'modules/wallets/actions'

export default {
  achievements: {
    chain: achievementChain,
    list: achievementsList
  },
  login,
  registration,
  transactions,
  ui: {
    general: uiGeneral,
    notifications: uiNotifications
  },
  users,
  wallets
}
