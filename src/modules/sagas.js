import { all, fork } from 'redux-saga/effects'

import achievements from 'modules/achievements/sagas'
import timeline from 'modules/timeline/sagas'
import uiGeneral from 'modules/ui/general/sagas'
import uiNotifications from 'modules/ui/notifications/sagas'
import wallets from 'modules/wallets/sagas'

export default function * rootSaga () {
  yield all([
    fork(achievements),
    fork(timeline),
    fork(uiGeneral),
    fork(uiNotifications),
    fork(wallets)
  ])
}
