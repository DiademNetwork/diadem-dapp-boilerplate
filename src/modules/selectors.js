import { achievementSelectors } from 'modules/achievement'
import { achievementsSelectors } from 'modules/achievements'
import { facebookLoginSelectors } from 'modules/facebook/login'
import { transactionsSelectors } from 'modules/transactions'
import { uiGeneralSelectors } from 'modules/ui/general'
import { usersSelectors } from 'modules/users'
import { walletsQtumSelectors } from 'modules/wallets/qtum'

export default {
  achievements: achievementSelectors,
  achievement: achievementsSelectors,
  facebook: {
    login: facebookLoginSelectors
  },
  transactions: transactionsSelectors,
  ui: {
    general: uiGeneralSelectors
  },
  user: usersSelectors,
  wallets: {
    qtum: walletsQtumSelectors
  }
}
