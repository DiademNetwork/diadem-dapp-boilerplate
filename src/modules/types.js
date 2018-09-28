import { achievementTypes } from 'modules/achievement'
import { achievementsTypes } from 'modules/achievements'
import { facebookLoginTypes } from 'modules/facebook/login'
import { facebookRegistrationTypes } from 'modules/facebook/registration'
import { transactionsTypes } from 'modules/transactions'
import { uiGeneralTypes } from 'modules/ui/general'
import { usersTypes } from 'modules/users'
import { walletsQtumTypes } from 'modules/wallets/qtum'

export default {
  achievements: achievementTypes,
  achievement: achievementsTypes,
  facebook: {
    login: facebookLoginTypes,
    registration: facebookRegistrationTypes
  },
  transactions: transactionsTypes,
  ui: {
    general: uiGeneralTypes
  },
  user: usersTypes,
  wallets: {
    qtum: walletsQtumTypes
  }
}
