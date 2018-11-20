import { fork } from 'redux-saga/effects'

import achievementsChain from 'modules/achievements/chain/sagas'
import achievementsList from 'modules/achievements/list/sagas'
import registration from 'modules/registration/sagas'
import transactions from 'modules/transactions/sagas'
import uiGeneral from 'modules/ui/general/sagas'
import uiNotifications from 'modules/ui/notifications/sagas'
import users from 'modules/users/sagas'
import wallets from 'modules/wallets/sagas'

export default function * rootSaga () {
  yield [
    fork(achievementsChain),
    fork(achievementsList),
    fork(registration),
    fork(transactions),
    fork(uiGeneral),
    fork(uiNotifications),
    fork(users),
    fork(wallets)
  ]
}
