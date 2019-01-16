
import { all, call, put, select, takeLatest, fork } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
import * as R from 'ramda'
import api from 'services/api'
// import insight from 'services/insight'
import T from 'modules/types'
import S from 'modules/selectors'
import ownA from './actions'
import ownT from './types'
// import * as ownS from './selectors'
// import { oneOfTypes } from 'modules/utils'
import blockchains from 'configurables/blockchains'

// const AUTO_WALLET_REFRESH_INTERVAL = 6000 // in ms
// const AUTO_CHECK_TRANSACTIONS_INTERVAL = 1000 // in ms

const userID = 'default'

const checkRegistration = function * ({ blockchainKey, userID }) {
  try {
    const privateKey = window.localStorage.getItem(`${blockchainKey}-privateKey-${userID}`)
    return { isRegistered: !!privateKey, status: 'registration-checked' }
  } catch (error) {
    throw error
  }
}

// Check all blokchain registrations
const checkRegistrations = function * () {
  try {
    const registrationsData = yield all(
      blockchains.keys
        .map(blockchainKey => {
          return call(checkRegistration, { blockchainKey, userID })
        })
    )
    yield put(ownA.checkRegistrations.succeeded({ data: R.zipObj(blockchains.keys)(registrationsData) }))
  } catch (error) {
    yield put(ownA.checkRegistrations.errored({ error }))
  }
}

// generate a new wallet locally
const generateWallet = function * ({ blockchainKey }) {
  try {
    const { generateWallet, getWalletData } = blockchains.get(blockchainKey)
    const { mnemonic, privateKey } = generateWallet()
    window.localStorage.setItem(`${blockchainKey}-privateKey-${userID}`, privateKey)
    const walletData = yield call(getWalletData)
    const data = { mnemonic, privateKey, ...walletData, status: 'generated' }
    yield put(ownA.generate.succeeded({ blockchainKey, data }))
  } catch (error) {
    yield put(ownA.generate.errored({ error }))
  }
}

// register wallet on blockchain
// needed for EOS, Decent, and other blockchains that require creation of account
const registerWallet = function * ({ blockchainKey, data }) {
  const { registerWallet } = blockchains.get(blockchainKey)
  try {
    const { ok: registrationSucceeded } = yield call(registerWallet, data)
    if (registrationSucceeded) {
      yield put(ownA.register.succeeded({ blockchainKey }))
    } else {
      yield put(ownA.register.failed({ blockchainKey }))
    }
  } catch (error) {
    yield put(ownA.register.errored({ error }))
  }
}

const registerUser = function * () {
  try {
    const blockchainKey = blockchains.primary.key
    const userAccessToken = yield select(S.login.userAccessToken)
    const userName = yield select(S.login.userName)
    const userID = yield select(S.login.userID)
    const walletAddress = yield select(S.wallets.address(blockchainKey))
    const { ok: registrationSucceeded } = yield call(api.registerUser(blockchainKey), {
      address: walletAddress,
      name: userName,
      user: userID,
      token: userAccessToken
    })
    if (registrationSucceeded) {
      yield put(ownA.connect.succeeded({ blockchainKey }))
    } else {
      yield put(ownA.connect.failed({ blockchainKey }))
    }
  } catch (error) {
    yield put(ownA.connect.errored({ error }))
  }
}

// initialize load wallet for all which are registered and not pending registration
// initialize primary wallet automatically on first visit
const loadWallets = function * ({ data: registrationsData }) {
  try {
    const isPrimaryBlockchainRegistered = registrationsData[blockchains.primary.key].isRegistered
    if (!isPrimaryBlockchainRegistered) {
      yield call(generateWallet, { blockchainKey: blockchains.primary.key })
    }
    yield all(
      Object.keys(registrationsData)
        .filter(blockchainKey => registrationsData[blockchainKey].isRegistered)
        .map(blockchainKey => {
          return call(loadWallet, { blockchainKey })
        })
    )
  } catch (error) {
    yield put(ownA.load.errored({ error }))
  }
}

const checkIsWalletAddressTheOneRegistered = function * ({
  blockchainKey,
  userID,
  walletAddress
}) {
  const { ok: isWalletAddressTheOneRegistered } = yield call(api.checkWalletAddressMatchesRegisteredUser(blockchainKey), {
    user: userID,
    walletAddress
  })
  return isWalletAddressTheOneRegistered
}

const loadWallet = function * ({ blockchainKey }) {
  try {
    const privateKey = window.localStorage.getItem(`${blockchainKey}-privateKey-${userID}`)
    if (!privateKey) {
      yield put(ownA.load.failed({ blockchainKey, status: 'no-private-key' }))
    } else {
      const { initFromPrivateKey, getWalletData } = blockchains.get(blockchainKey)
      yield call(initFromPrivateKey, privateKey)
      const walletData = yield call(getWalletData)
      yield put(ownA.load.succeeded({ blockchainKey, data: walletData }))
    }
  } catch (error) {
    throw error
  }
}

const recoverWallet = function * ({ blockchainKey, mnemonic, privateKey }) {
  try {
    const {
      initFromPrivateKey,
      initFromMnemonic,
      getPrivateKey,
      getWalletData
    } = blockchains.get(blockchainKey)
    if (privateKey) {
      yield call(initFromPrivateKey, privateKey)
    } else if (mnemonic) {
      yield call(initFromMnemonic, mnemonic)
    } else {
      yield put(ownA.recover.failed({ blockchainKey, status: 'no-mnemonic-or-private-key' }))
      return
    }
    const walletData = yield call(getWalletData)
    window.localStorage.setItem(`${blockchainKey}-privateKey-${userID}`, yield call(getPrivateKey))
    yield put(ownA.recover.succeeded({ blockchainKey, data: walletData }))
  } catch (error) {
    yield put(ownA.recover.errored({ error }))
  }
}

// const refresh = function * () {
//   yield take(oneOfTypes([
//     ownT.GENERATE.succeeded,
//     ownT.LOAD.succeeded,
//     ownT.RECOVER.succeeded
//   ]))
//   while (true) {
//     try {
//       const readyWalletsInfo = R.map(R.prop('walletInfo'))(yield select(ownS.getReadyWallets))
//       const readyWalletsKeys = R.keys(readyWalletsInfo)
//       const newReadyWalletsInfo = yield all(
//         readyWalletsKeys.map(key => call(blockchains.get(key).getWalletData))
//       )
//       const formattedNewReadyWalletsinfo = R.compose(
//         R.zipObj(readyWalletsKeys),
//         R.map(R.objOf('walletInfo'))
//       )(newReadyWalletsInfo)

//       if (!R.equals(formattedNewReadyWalletsinfo, readyWalletsInfo)) {
//         yield put(ownA.refresh.succeeded({ data: formattedNewReadyWalletsinfo }))
//       }
//       // if (R.complement(R.equals)(newWalletData, walletData)) {
//       //   const changes = { }
//       //   const { unconfirmedBalance } = walletData
//       //   const { unconfirmedBalance: newUnconfirmedBalance } = newWalletData
//       //   if (newUnconfirmedBalance !== undefined && newUnconfirmedBalance !== unconfirmedBalance) {
//       //     switch (true) {
//       //       case unconfirmedBalance < 0 && newUnconfirmedBalance === 0: // token sent
//       //         changes.tokensSent = true
//       //         break
//       //       case unconfirmedBalance > 0 && newUnconfirmedBalance === 0: // token received
//       //         changes.tokensReceived = true
//       //         break
//       //       case unconfirmedBalance === 0 && newUnconfirmedBalance > 0: // token comming
//       //         changes.receivingTokens = true
//       //         break
//       //       case unconfirmedBalance === 0 && newUnconfirmedBalance < 0: // token sending
//       //         changes.sendingTokens = true
//       //         break
//       //       default:
//       //         break
//       //     }
//       //   }
//       //   yield put(ownA.refresh.succeeded({ changes, walletData: newWalletData }))
//       // }
//     } catch (error) {
//       yield put(ownA.refresh.errored({ error }))
//     }
//     yield call(delay, AUTO_WALLET_REFRESH_INTERVAL)
//   }
// }

// const checkLastTx = function * () {
//   yield takeEvery(oneOfTypes([
//     T.login.LOGGED,
//     T.transactions.FETCH.succeeded,
//     T.transactions.RECEIVED
//   ]), function * () {
//     yield put(ownA.checkLastTx.requested())
//     try {
//       let hasPendingTx = false
//       const userID = yield select(S.login.userID)
//       if (userID) {
//         const transactions = yield select(S.transactions.lastForUser(userID))
//         if (transactions.length > 0) {
//           // if at least one of transactions has no confirmation, hasPendingTx is true
//           for (let transaction of transactions) {
//             const { data: { confirmations } } = yield call(insight.checkTransactions, `insight-api/tx/${transaction}`)
//             hasPendingTx = hasPendingTx || confirmations === 0
//           }
//         }
//       }
//       yield put(ownA.checkLastTx.succeeded({ hasPendingTx }))
//       yield call(delay, AUTO_CHECK_TRANSACTIONS_INTERVAL)
//     } catch (error) {
//       yield put(ownA.checkLastTx.errored({ error }))
//     }
//   })
// }

const withdraw = function * ({ blockchainKey, ...payload }) {
  try {
    const { withdraw } = blockchains.get(blockchainKey)
    yield call(withdraw, payload)
    yield put(ownA.withdraw.succeeded())
  } catch (error) {
    yield put(ownA.withdraw.errored({ error }))
  }
}

export default function * () {
  yield all([
    fork(checkRegistrations),
    takeLatest(T.login.LOGGED, registerUser),
    takeLatest(ownT.CHECK_REGISTRATIONS.succeeded, loadWallets),
    takeLatest(ownT.GENERATE.requested, generateWallet),
    takeLatest(ownT.GENERATE.succeeded, registerWallet),
    takeLatest(ownT.RECOVER.requested, recoverWallet),
    takeLatest(ownT.WITHDRAW.requested, withdraw)
    // fork(refresh)
    // fork(checkLastTx)
  ])
}
