import { all, fork } from 'redux-saga/effects'

import achievements from 'modules/achievements2/sagas'
import timeline from 'modules/timeline/sagas'
import uiGeneral from 'modules/ui/general/sagas'
import uiNotifications from 'modules/ui/notifications/sagas'
// import users from 'modules/users/sagas'
import wallets from 'modules/wallets/sagas'

// removed transactions and users for now
export default function * rootSaga () {
  yield all([
    fork(achievements),
    fork(timeline),
    fork(uiGeneral),
    fork(uiNotifications),
    // fork(users),
    fork(wallets)
  ])
}
