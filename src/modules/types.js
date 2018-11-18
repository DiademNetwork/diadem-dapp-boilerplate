import achievement from 'modules/achievement/types'
import achievements from 'modules/achievements/types'
import facebookLogin from 'modules/facebook/login/types'
import facebookRegistration from 'modules/facebook/registration/types'
import transactions from 'modules/transactions/types'
import uiGeneral from 'modules/ui/general/types'
import users from 'modules/users/types'
import walletsQtum from 'modules/wallets/qtum/types'
import walletsDecent from 'modules/wallets/decent/types'

export default {
  achievement,
  achievements,
  facebook: {
    login: facebookLogin,
    registration: facebookRegistration
  },
  transactions,
  ui: {
    general: uiGeneral
  },
  users,
  wallets: {
    qtum: walletsQtum,
    decent: walletsDecent
  }
}
