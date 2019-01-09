import { fork } from 'redux-saga/effects'

import achievements from 'modules/achievements2/sagas'
// import transactions from 'modules/transactions/sagas'
import uiGeneral from 'modules/ui/general/sagas'
import uiNotifications from 'modules/ui/notifications/sagas'
// import users from 'modules/users/sagas'
import wallets from 'modules/wallets/sagas'

// removed transactions and users for now
export default function * rootSaga () {
  yield [
    fork(achievements),
    // fork(transactions),
    fork(uiGeneral),
    fork(uiNotifications),
    // fork(users),
    fork(wallets)
  ]
}
