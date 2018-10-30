
import { all, call, fork, put, select, take, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import * as R from 'ramda'
import api from 'services/api'
import insight from 'services/insight'
import types from 'modules/types'
import selectors from 'modules/selectors'
import actions from './actions'
import ownTypes from './types'
import * as ownSelectors from './selectors'
import { oneOfTypes } from 'modules/utils'

const network = networks[process.env.QTUM_NETWORK]

const AUTO_WALLET_REFRESH_INTERVAL = 6000 // in ms
const AUTO_CHECK_TRANSACTIONS_INTERVAL = 1000 // in ms

const checkIfGenerationNeeded = function * ({ reason }) {
  if (reason === 'not-registered') {
    yield put(actions.generate.requested())
  }
}

const checkAddressMatchingFacebookID = function * ({ facebookUserID, walletAddress }) {
  const { ok: isAddressMatchingFacebookID } = yield call(api.checkQTUMAddressMatchesFacebookUser, {
    user: facebookUserID,
    walletAddress
  })
  return isAddressMatchingFacebookID
}

const load = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const privateKey = window.localStorage.getItem(`privateKey-${facebookUserID}`)
    if (!privateKey) {
      yield put(actions.load.failed({ reason: 'no-private-key' }))
    } else {
      const walletUtil = network.fromWIF(privateKey)
      const walletData = yield call([walletUtil, 'getInfo'])
      const isAddressMatchingFacebookID = yield call(checkAddressMatchingFacebookID, {
        facebookUserID,
        walletAddress: walletData.addrStr
      })
      if (isAddressMatchingFacebookID) {
        yield put(actions.load.succeeded({ walletData, walletUtil }))
      } else {
        yield put(actions.load.failed({ reason: 'address-not-matching' }))
      }
    }
  } catch (error) {
    yield put(actions.load.errored({ error }))
  }
}

const generate = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const mnemonic = generateMnemonic()
    const walletUtil = network.fromMnemonic(mnemonic)
    const privateKey = walletUtil.toWIF()
    window.localStorage.setItem(`privateKey-${facebookUserID}`, privateKey)
    const walletData = yield call([walletUtil, 'getInfo'])
    yield put(actions.generate.succeeded({ mnemonic, privateKey, walletData, walletUtil }))
  } catch (error) {
    yield put(actions.generate.errored({ error }))
  }
}

const recover = function * ({ mnemonic, privateKey }) {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    let walletUtil
    if (privateKey) {
      walletUtil = network.fromWIF(privateKey)
    } else if (mnemonic) {
      walletUtil = network.fromMnemonic(mnemonic)
      privateKey = walletUtil.toWIF()
    } else {
      yield put(actions.generate.failed({ reason: 'no-mnemonic-or-private-key' }))
    }
    const walletData = yield call([walletUtil, 'getInfo'])
    const isAddressMatchingFacebookID = yield call(checkAddressMatchingFacebookID, {
      facebookUserID,
      walletAddress: walletData.addrStr
    })
    if (isAddressMatchingFacebookID) {
      window.localStorage.setItem(`privateKey-${facebookUserID}`, privateKey)
      yield put(actions.recover.succeeded({ walletData, walletUtil }))
    } else {
      yield put(actions.recover.failed({ reason: 'address-not-matching' }))
    }
  } catch (error) {
    yield put(actions.generate.errored({ error }))
  }
}

const refresh = function * () {
  yield take(oneOfTypes([
    ownTypes.GENERATE.succeeded,
    ownTypes.LOAD.succeeded,
    ownTypes.RECOVER.succeeded
  ]))
  while (true) {
    try {
      const walletUtil = yield select(ownSelectors.util)
      const walletData = yield select(ownSelectors.data)
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
        yield put(actions.refresh.succeeded({ changes, walletData: newWalletData }))
      }
    } catch (error) {
      yield put(actions.refresh.errored({ error }))
    }
    yield call(delay, AUTO_WALLET_REFRESH_INTERVAL)
  }
}

const checkLastTx = function * () {
  yield takeEvery(oneOfTypes([
    types.facebook.login.LOGGED,
    types.transactions.FETCH.succeeded,
    types.transactions.RECEIVED
  ]), function * () {
    yield put(actions.checkLastTx.requested())
    const facebookUserID = yield select(selectors.facebook.login.userID)
    if (facebookUserID) {
      const transactions = yield select(selectors.transactions.lastForUser(facebookUserID))
      if (transactions.length > 0) {
        try {
          let hasPendingTx = true
          while (hasPendingTx) {
            for (let transaction of transactions) {
              const { data: { confirmations } } = yield call(insight.checkTransactions, `insight-api/tx/${transaction}`)
              hasPendingTx = hasPendingTx || confirmations === 0
            }
            yield put(actions.checkLastTx.succeeded({ hasPendingTx }))
            yield call(delay, AUTO_CHECK_TRANSACTIONS_INTERVAL)
          }
        } catch (error) {
          yield put(actions.checkLastTx.errored({ error }))
        }
      }
    }
  })
}

const withdraw = function * ({address, amount, fees}) {
  try {
    const walletUtil = yield select(ownSelectors.util)
    yield call(walletUtil.send, address, amount * 1e8, { feeRate: fees })
    yield put(actions.withdraw.succeeded())
  } catch (error) {
    yield put(actions.withdraw.errored({ error }))
  }
}

export default function * () {
  yield all([
    takeLatest(types.facebook.registration.CHECK.succeeded, load),
    takeLatest(types.facebook.registration.CHECK.failed, checkIfGenerationNeeded),
    takeLatest(ownTypes.GENERATE.requested, generate),
    takeLatest(ownTypes.RECOVER.requested, recover),
    takeLatest(ownTypes.WITHDRAW.requested, withdraw),
    fork(refresh),
    fork(checkLastTx)
  ])
}
