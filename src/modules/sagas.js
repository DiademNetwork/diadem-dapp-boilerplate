import { fork } from 'redux-saga/effects'

import achievement from 'modules/achievement/sagas'
import achievements from 'modules/achievements/sagas'
import facebookRegistration from 'modules/facebook/registration/sagas'
import transactions from 'modules/transactions/sagas'
import uiGeneral from 'modules/ui/general/sagas'
import uiNotifications from 'modules/ui/notifications/sagas'
import users from 'modules/users/sagas'
import walletsDecent from 'modules/wallets/decent/sagas'

export default function * rootSaga () {
  yield [
    fork(achievement),
    fork(achievements),
    fork(facebookRegistration),
    fork(transactions),
    fork(uiGeneral),
    fork(uiNotifications),
    fork(users),
    fork(walletsDecent)
  ]
}
