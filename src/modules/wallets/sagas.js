
import { all, call, put, select, takeLatest, takeEvery, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as R from 'ramda'
import api from 'services/api'
import stream from 'services/stream'
import T from 'modules/types'
import S from 'modules/selectors'
import ownA from './actions'
import ownT from './types'
import * as ownS from './selectors'
import blockchains from 'configurables/blockchains'

const userID = 'default'
const AUTO_WALLET_REFRESH_INTERVAL = 6000

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
    const userAccessToken = yield select(S.network.userAccessToken)
    const userName = yield select(S.network.userName)
    const userID = yield select(S.network.userID)
    const walletAddress = yield select(S.wallets.address(blockchainKey))
    yield call(setUser)
    const { ok: registrationSucceeded } = yield call(api.registerUser(blockchainKey), {
      address: walletAddress,
      name: userName,
      user: userID,
      token: userAccessToken
    })
    if (registrationSucceeded) {
      yield put(ownA.connect.succeeded({ userAddress: walletAddress, blockchainKey }))
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

const withdraw = function * ({ blockchainKey, ...payload }) {
  try {
    const { withdraw } = blockchains.get(blockchainKey)
    yield call(withdraw, payload)
    yield put(ownA.withdraw.succeeded())
  } catch (error) {
    yield put(ownA.withdraw.errored({ error }))
  }
}

const getGetstreamTokenIfNecessary = function * ({ blockchainKey, data: { addrStr: userAddress } }) {
  if (blockchains.isPrimary(blockchains.get(blockchainKey))) {
    try {
      const { token } = yield call(api.getUserToken, { userAddress })
      if (!token) {
        yield put(ownA.getGetstreamToken.failed({ status: 'no-token' }))
      } else {
        yield call(stream.userToken.set, token)
        yield call(stream.userClient.init)
        yield put(ownA.getGetstreamToken.succeeded({ userAddress }))
      }
    } catch (error) {
      yield put(ownA.getGetstreamToken.errored({ error }))
    }
  }
}

const setUser = function * () {
  const userAddress = yield select(ownS.primaryAddress)
  const data = yield select(S.network.data)
  yield call(stream.setUser, { data, userAddress })
}

const refreshWallet = function * ({ blockchainKey }) {
  while (true) {
    yield call(delay, AUTO_WALLET_REFRESH_INTERVAL)
    try {
      const walletData = yield select(ownS.data(blockchainKey))
      const newWalletData = yield call(blockchains.get(blockchainKey).getWalletData)
      if (R.complement(R.equals)(walletData, newWalletData)) {
        const changes = { }
        const unconfirmedBalance = R.prop('unconfirmedBalance')(walletData)
        const newUnconfirmedBalance = R.prop('unconfirmedBalance')(newWalletData)
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
        yield put(ownA.refresh.succeeded({ changes, blockchainKey, data: walletData }))
      }
    } catch (error) {
      yield put(ownA.refresh.errored({ error }))
    }
  }
}

export default function * () {
  yield all([
    fork(checkRegistrations),
    takeLatest(T.network.LOGGED, registerUser),
    takeLatest(ownT.CHECK_REGISTRATIONS.succeeded, loadWallets),
    takeLatest(ownT.GENERATE.requested, generateWallet),
    takeLatest(ownT.GENERATE.succeeded, registerWallet),
    takeLatest(ownT.RECOVER.requested, recoverWallet),
    takeLatest(ownT.WITHDRAW.requested, withdraw),
    takeEvery([
      ownT.GENERATE.succeeded,
      ownT.LOAD.succeeded,
      ownT.RECOVER.succeeded
    ], getGetstreamTokenIfNecessary),
    takeEvery([
      ownT.GENERATE.succeeded,
      ownT.LOAD.succeeded,
      ownT.RECOVER.succeeded
    ], refreshWallet),
    takeLatest(ownT.GET_GETSTREAM_TOKEN.succeeded, setUser)
  ])
}
