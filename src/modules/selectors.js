import * as achievements from 'modules/achievements/selectors'
import * as login from 'modules/login/selectors'
import * as timeline from 'modules/timeline/selectors'
import * as transactions from 'modules/transactions/selectors'
import * as uiGeneral from 'modules/ui/general/selectors'
import * as uiNotifications from 'modules/ui/notifications/selectors'
import * as users from 'modules/users/selectors'
import * as wallets from 'modules/wallets/selectors'

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
