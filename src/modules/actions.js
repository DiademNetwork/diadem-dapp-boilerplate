import achievement from 'modules/achievement/actions'
import achievements from 'modules/achievements/actions'
import facebookLogin from 'modules/facebook/login/actions'
import facebookRegistration from 'modules/facebook/registration/actions'
import transactions from 'modules/transactions/actions'
import uiGeneral from 'modules/ui/general/actions'
import uiNotifications from 'modules/ui/notifications/actions'
import users from 'modules/users/actions'
import walletsQtum from 'modules/wallets/qtum/actions'
import walletsDecent from 'modules/wallets/decent/actions'

export default {
  achievement,
  achievements,
  facebook: {
    login: facebookLogin,
    registration: facebookRegistration
  },
  transactions,
  ui: {
    general: uiGeneral,
    notifications: uiNotifications
  },
  users,
  wallets: {
    qtum: walletsQtum,
    decent: walletsDecent
  }
}
