import { achievementActions } from 'modules/achievement'
import { achievementsActions } from 'modules/achievements'
import { facebookLoginActions } from 'modules/facebook/login'
import { facebookRegistrationActions } from 'modules/facebook/registration'
import { transactionsActions } from 'modules/transactions'
import { uiGeneralActions } from 'modules/ui/general'
import { usersActions } from 'modules/users'
import { walletsQtumActions } from 'modules/wallets/qtum'

export default {
  achievements: achievementActions,
  achievement: achievementsActions,
  facebook: {
    login: facebookLoginActions,
    registration: facebookRegistrationActions
  },
  transactions: transactionsActions,
  ui: {
    general: uiGeneralActions
  },
  user: usersActions,
  wallets: {
    qtum: walletsQtumActions
  }
}
