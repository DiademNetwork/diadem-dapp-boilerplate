
import { all, put, takeLatest } from 'redux-saga/effects'
import T from 'modules/types'
import ownA from './actions'

const display = (actionName) => function * () {
  yield put(ownA[actionName])
}

export default function * () {
  yield all([
    takeLatest(T.achievements.CREATE.succeeded, display('achievementCreateSuccess')),
    takeLatest(T.achievements.CREATE.errored, display('achievementCreateError')),
    takeLatest(T.achievements.CONFIRM.succeeded, display('achievementConfirmSuccess')),
    takeLatest(T.achievements.CONFIRM.errored, display('achievementConfirmError')),
    takeLatest(T.achievements.SUPPORT.succeeded, display('achievementSupportSuccess')),
    takeLatest(T.achievements.SUPPORT.errored, display('achievementSupportError')),
    takeLatest(T.achievements.FETCH.errored, display('achievementsFetchError')),
    takeLatest(T.achievements.FETCH_USER.errored, display('achievementsFetchError')),
    takeLatest(T.achievements.RECEIVED, display('achievementsReceived')),
    takeLatest(T.network.LOGGED, display('loginSuccess')),
    takeLatest(T.timeline.FETCH.errored, display('timelineFetchError')),
    takeLatest(T.timeline.RECEIVED, display('timelineReceived')),
    takeLatest(T.wallets.CHECK_REGISTRATIONS.errored, display('walletCheckRegistrationError')),
    takeLatest(T.wallets.REGISTER.succeeded, display('walletRegistrationSuccess')),
    takeLatest(T.wallets.REGISTER.errored, display('walletRegistrationError')),
    takeLatest(T.wallets.REGISTER.failed, display('walletRegistrationError')),
    takeLatest(T.wallets.RECOVER.succeeded, display('walletRecoverSuccess')),
    takeLatest(T.wallets.RECOVER.errored, display('walletRecoverError')),
    takeLatest(T.wallets.GENERATE.succeeded, display('walletGenerateSuccess')),
    takeLatest(T.wallets.GENERATE.errored, display('walletGenerateError')),
    takeLatest(T.wallets.WITHDRAW.succeeded, display('walletWithdrawSuccess')),
    takeLatest(T.wallets.WITHDRAW.errored, display('walletWithdrawError'))
  ])
}
