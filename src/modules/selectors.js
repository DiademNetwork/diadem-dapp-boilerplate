import * as achievement from 'modules/achievement/selectors'
import * as achievements from 'modules/achievements/selectors'
import * as facebookLogin from 'modules/facebook/login/selectors'
import * as facebookRegistration from 'modules/facebook/registration/selectors'
import * as transactions from 'modules/transactions/selectors'
import * as uiGeneral from 'modules/ui/general/selectors'
import * as users from 'modules/users/selectors'
import * as walletsQtum from 'modules/wallets/qtum/selectors'

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
    qtum: walletsQtum
  }
}
