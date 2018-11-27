
import { all, call, fork, put, select, take, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as R from 'ramda'
import api from 'services/api'
import insight from 'services/insight'
import qtumJSWallet from 'services/qtumjs-wallet'
import T from 'modules/types'
import S from 'modules/selectors'
import ownA from './actions'
import ownT from './types'
import * as ownS from './selectors'
import { callForEachBlockchain, oneOfTypes } from 'modules/utils'
const { networks, generateMnemonic } = qtumJSWallet

const network = networks[process.env.QTUM_NETWORK]

const AUTO_WALLET_REFRESH_INTERVAL = 6000 // in ms
const AUTO_CHECK_TRANSACTIONS_INTERVAL = 1000 // in ms

const register = function * ({ walletData }) {
  try {
    const userAccessToken = yield select(S.login.userAccessToken)
    const userName = yield select(S.login.userName)
    const userID = yield select(S.login.userID)
    yield call(api.registerUser, {
      address: walletData.addrStr,
      name: userName,
      user: userID,
      token: userAccessToken
    })
    yield put(ownA.register.succeeded())
  } catch (error) {
    yield put(ownA.register.errored({ error }))
  }
}

const checkRegistrations = function * () {
  try {
    const userID = yield select(S.login.userID)
    const registrations = yield callForEachBlockchain(
      api.checkRegistration,
      { user: userID },
      ({ exists, pending }) => ({ isRegistered: exists, isRegistrationPending: pending })
    )
    yield put(ownA.checkRegistrations.succeeded({ registrations }))
  } catch (error) {
    yield put(ownA.checkRegistrations.errored({ error }))
  }
}

const checkAddressMatchingNetworkUserID = function * ({ userID, walletAddress }) {
  const { ok: isAddressMatchingNetworkUserID } = yield call(api.checkQTUMAddressMatchesRegisteredUser, {
    user: userID,
    walletAddress
  })
  return isAddressMatchingNetworkUserID
}

const load = function * () {
  try {
    const userID = yield select(S.login.userID)
    const privateKey = window.localStorage.getItem(`privateKey-${userID}`)
    if (!privateKey) {
      yield put(ownA.load.failed({ reason: 'no-private-key' }))
    } else {
      const walletUtil = network.fromWIF(privateKey)
      const walletData = yield call([walletUtil, 'getInfo'])
      const isAddressMatchingNetworkUserID = yield call(checkAddressMatchingNetworkUserID, {
        userID,
        walletAddress: walletData.addrStr
      })
      if (isAddressMatchingNetworkUserID) {
        yield put(ownA.load.succeeded({ walletData, walletUtil }))
      } else {
        yield put(ownA.load.failed({ reason: 'address-not-matching' }))
      }
    }
  } catch (error) {
    yield put(ownA.load.errored({ error }))
  }
}

const generate = function * () {
  try {
    const userID = yield select(S.login.userID)
    const mnemonic = generateMnemonic()
    const walletUtil = network.fromMnemonic(mnemonic)
    const privateKey = walletUtil.toWIF()
    window.localStorage.setItem(`privateKey-${userID}`, privateKey)
    const walletData = yield call([walletUtil, 'getInfo'])
    yield put(ownA.generate.succeeded({ mnemonic, privateKey, walletData, walletUtil }))
  } catch (error) {
    yield put(ownA.generate.errored({ error }))
  }
}

const recover = function * ({ mnemonic, privateKey }) {
  try {
    const userID = yield select(S.login.userID)
    let walletUtil
    if (privateKey) {
      walletUtil = network.fromWIF(privateKey)
    } else if (mnemonic) {
      walletUtil = network.fromMnemonic(mnemonic)
      privateKey = walletUtil.toWIF()
    } else {
      yield put(ownA.recover.failed({ reason: 'no-mnemonic-or-private-key' }))
    }
    const walletData = yield call([walletUtil, 'getInfo'])
    const isAddressMatchingNetworkUserID = yield call(checkAddressMatchingNetworkUserID, {
      userID,
      walletAddress: walletData.addrStr
    })
    if (isAddressMatchingNetworkUserID) {
      window.localStorage.setItem(`privateKey-${userID}`, privateKey)
      yield put(ownA.recover.succeeded({ walletData, walletUtil }))
    } else {
      yield put(ownA.recover.failed({ reason: 'address-not-matching' }))
    }
  } catch (error) {
    yield put(ownA.generate.errored({ error }))
  }
}

const refresh = function * () {
  yield take(oneOfTypes([
    ownT.GENERATE.succeeded,
    ownT.LOAD.succeeded,
    ownT.RECOVER.succeeded
  ]))
  while (true) {
    try {
      const walletUtil = yield select(ownS.util)
      const walletData = yield select(ownS.data)
      const newWalletData = yield call([walletUtil, 'getInfo'])
      if (R.complement(R.equals)(newWalletData, walletData)) {
        const changes = { }
        const { unconfirmedBalance } = walletData
        const { unconfirmedBalance: newUnconfirmedBalance } = newWalletData
        if (newUnconfirmedBalance !== undefined && newUnconfirmedBalance !== unconfirmedBalance) {
          switch (true) {
            case unconfirmedBalance < 0 && newUnconfirmedBalance === 0: // token sent
              changes.tokensSent = true
              break
            case unconfirmedBalance > 0 && newUnconfirmedBalance === 0: // token received
              changes.tokensReceived = true
              break
            case unconfirmedBalance === 0 && newUnconfirmedBalance > 0: // token comming
              changes.receivingTokens = true
              break
            case unconfirmedBalance === 0 && newUnconfirmedBalance < 0: // token sending
              changes.sendingTokens = true
              break
            default:
              break
          }
        }
        yield put(ownA.refresh.succeeded({ changes, walletData: newWalletData }))
      }
    } catch (error) {
      yield put(ownA.refresh.errored({ error }))
    }
    yield call(delay, AUTO_WALLET_REFRESH_INTERVAL)
  }
}

const checkLastTx = function * () {
  yield takeEvery(oneOfTypes([
    T.login.LOGGED,
    T.transactions.FETCH.succeeded,
    T.transactions.RECEIVED
  ]), function * () {
    yield put(ownA.checkLastTx.requested())
    try {
      let hasPendingTx = false
      const userID = yield select(S.login.userID)
      if (userID) {
        const transactions = yield select(S.transactions.lastForUser(userID))
        if (transactions.length > 0) {
          // if at least one of transactions has no confirmation, hasPendingTx is true
          for (let transaction of transactions) {
            const { data: { confirmations } } = yield call(insight.checkTransactions, `insight-api/tx/${transaction}`)
            hasPendingTx = hasPendingTx || confirmations === 0
          }
        }
      }
      yield put(ownA.checkLastTx.succeeded({ hasPendingTx }))
      yield call(delay, AUTO_CHECK_TRANSACTIONS_INTERVAL)
    } catch (error) {
      yield put(ownA.checkLastTx.errored({ error }))
    }
  })
}

const withdraw = function * ({address, amount, fees}) {
  try {
    const walletUtil = yield select(ownS.util)
    yield call(walletUtil.send, address, amount * 1e8, { feeRate: fees })
    yield put(ownA.withdraw.succeeded())
  } catch (error) {
    yield put(ownA.withdraw.errored({ error }))
  }
}

export default function * () {
  yield all([
    takeLatest(T.login.LOGGED, checkRegistrations),
    takeLatest(ownT.CHECK_REGISTRATIONS.succeeded, load),
    takeLatest(ownT.GENERATE.requested, generate),
    takeLatest(ownT.GENERATE.succeeded, register),
    takeLatest(ownT.RECOVER.requested, recover),
    takeLatest(ownT.WITHDRAW.requested, withdraw),
    fork(refresh),
    fork(checkLastTx)
  ])
}
