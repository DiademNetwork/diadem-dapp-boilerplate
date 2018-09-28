import { achievementSagas } from 'modules/achievement'
import { achievementsSagas } from 'modules/achievements'
import { facebookRegistrationSagas } from 'modules/facebook/registration'
import { transactionsSagas } from 'modules/transactions'
// import { uiNotificationsSagas } from 'modules/ui/notifications'
import { usersSagas } from 'modules/users'
import { walletsQtumSagas } from 'modules/wallets/qtum'

export default [
  achievementSagas,
  achievementsSagas,
  facebookRegistrationSagas,
  transactionsSagas,
  // uiNotificationsSagas,
  usersSagas,
  walletsQtumSagas
]
