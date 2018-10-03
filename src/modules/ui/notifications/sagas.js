
import { all, call, put, takeLatest } from 'redux-saga/effects'
import types from 'modules/types'
import ownActions from './actions'

const display = (actionName) => function * () {
  yield put(ownActions[actionName])
}

const handleRefreshNotifications = function * ({ changes: {
  tokensSent,
  tokensReceived,
  receivingTokens,
  sendingTokens
} }) {
  if (tokensSent) { yield call(display, 'walletTokensSent') }
  if (tokensReceived) { yield call(display, 'walletTokensReceived') }
  if (receivingTokens) { yield call(display, 'walletReceivingTokens') }
  if (sendingTokens) { yield call(display, 'walletSendingTokens') }
}

export default function * () {
  yield all([
    takeLatest(types.facebook.login.LOGGED, display('facebookLoginSuccess')),
    takeLatest(types.facebook.registration.CHECK.errored, display('facebookRegistrationCheckError')),
    takeLatest(types.facebook.registration.REGISTER.succeeded, display('facebookRegistrationSuccess')),
    takeLatest(types.facebook.registration.REGISTER.errored, display('facebookRegistrationError')),
    takeLatest(types.achievements.FETCH.errored, display('achievementsFetchError')),
    takeLatest(types.achievements.RECEIVED, display('achievementsReceived')),
    takeLatest(types.transactions.FETCH.errored, display('transactionsFetchError')),
    takeLatest(types.transactions.RECEIVED, display('transactionsReceived')),
    takeLatest(types.wallets.qtum.RECOVER.succeeded, display('walletRecoverSuccess')),
    takeLatest(types.wallets.qtum.RECOVER.errored, display('walletRecoverError')),
    takeLatest(types.wallets.qtum.GENERATE.succeeded, display('walletGenerateSuccess')),
    takeLatest(types.wallets.qtum.GENERATE.errored, display('walletGenerateError')),
    takeLatest(types.wallets.qtum.WITHDRAW.succeeded, display('walletWithdrawSuccess')),
    takeLatest(types.wallets.qtum.WITHDRAW.errored, display('walletWithdrawError')),
    takeLatest(types.wallets.qtum.REFRESH.succeeded, handleRefreshNotifications),
    takeLatest(types.wallets.qtum.REFRESH.errored, display('walletRefreshError')),
    takeLatest(types.achievement.CREATE.succeeded, display('achievementCreateSuccess')),
    takeLatest(types.achievement.CREATE.errored, display('achievementCreateError')),
    takeLatest(types.achievement.UPDATE.succeeded, display('achievementUpdateSuccess')),
    takeLatest(types.achievement.UPDATE.errored, display('achievementUpdateError')),
    takeLatest(types.achievement.CONFIRM.succeeded, display('achievementConfirmSuccess')),
    takeLatest(types.achievement.CONFIRM.errored, display('achievementConfirmError')),
    takeLatest(types.achievement.SUPPORT.succeeded, display('achievementSupportSuccess')),
    takeLatest(types.achievement.SUPPORT.errored, display('achievementSupportError')),
    takeLatest(types.achievement.DEPOSIT.succeeded, display('achievementDepositSuccess')),
    takeLatest(types.achievement.DEPOSIT.errored, display('achievementDepositError')),
    takeLatest(types.users.FETCH.errored, display('usersFetchError'))
  ])
}
