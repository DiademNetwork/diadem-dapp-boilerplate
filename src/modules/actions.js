import achievements from 'modules/achievements/actions'
import login from 'modules/login/actions'
import transactions from 'modules/transactions/actions'
import uiGeneral from 'modules/ui/general/actions'
import uiNotifications from 'modules/ui/notifications/actions'
import users from 'modules/users/actions'
import wallets from 'modules/wallets/actions'
import timeline from 'modules/timeline/actions'

export default {
  achievements,
  login,
  timeline,
  transactions,
  ui: {
    general: uiGeneral,
    notifications: uiNotifications
  },
  users,
  wallets
}
