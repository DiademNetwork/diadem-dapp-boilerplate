
import { all, call, put, takeLatest } from 'redux-saga/effects'
import T from 'modules/types'
import ownA from './actions'

const display = (actionName) => function * () {
  yield put(ownA[actionName])
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
    takeLatest(T.achievements.chain.CREATE.succeeded, display('achievementCreateSuccess')),
    takeLatest(T.achievements.chain.CREATE.errored, display('achievementCreateError')),
    takeLatest(T.achievements.chain.UPDATE.succeeded, display('achievementUpdateSuccess')),
    takeLatest(T.achievements.chain.UPDATE.errored, display('achievementUpdateError')),
    takeLatest(T.achievements.chain.CONFIRM.succeeded, display('achievementConfirmSuccess')),
    takeLatest(T.achievements.chain.CONFIRM.errored, display('achievementConfirmError')),
    takeLatest(T.achievements.chain.SUPPORT.succeeded, display('achievementSupportSuccess')),
    takeLatest(T.achievements.chain.SUPPORT.errored, display('achievementSupportError')),
    takeLatest(T.achievements.chain.DEPOSIT.succeeded, display('achievementDepositSuccess')),
    takeLatest(T.achievements.chain.DEPOSIT.errored, display('achievementDepositError')),
    takeLatest(T.achievements.list.FETCH.errored, display('achievementsFetchError')),
    takeLatest(T.achievements.list.RECEIVED, display('achievementsReceived')),
    takeLatest(T.login.LOGGED, display('loginSuccess')),
    takeLatest(T.transactions.FETCH.errored, display('transactionsFetchError')),
    takeLatest(T.transactions.RECEIVED, display('transactionsReceived')),
    takeLatest(T.users.FETCH.errored, display('usersFetchError')),
    takeLatest(T.wallets.CHECK_REGISTRATION.errored, display('walletCheckRegistrationError')),
    takeLatest(T.wallets.REGISTER.succeeded, display('walletRegistrationSuccess')),
    takeLatest(T.wallets.REGISTER.errored, display('walletRegistrationError')),
    takeLatest(T.wallets.RECOVER.succeeded, display('walletRecoverSuccess')),
    takeLatest(T.wallets.RECOVER.errored, display('walletRecoverError')),
    takeLatest(T.wallets.GENERATE.succeeded, display('walletGenerateSuccess')),
    takeLatest(T.wallets.GENERATE.errored, display('walletGenerateError')),
    takeLatest(T.wallets.WITHDRAW.succeeded, display('walletWithdrawSuccess')),
    takeLatest(T.wallets.WITHDRAW.errored, display('walletWithdrawError')),
    takeLatest(T.wallets.REFRESH.succeeded, handleRefreshNotifications),
    takeLatest(T.wallets.REFRESH.errored, display('walletRefreshError'))
  ])
}
