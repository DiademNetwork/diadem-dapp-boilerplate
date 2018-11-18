import { all, fork, put, select, takeLatest, take } from 'redux-saga/effects'
import { oneOfTypes } from 'modules/utils'

import actions from './actions'
import selectors from 'modules/selectors'
import types from 'modules/types'
import ownTypes from './types'

import * as dcore from 'dcorejs'

const ADDRESS_PREFIX = 'dm'

const init = function * () {
  const chainId = '9c54faed15d4089d3546ac5eb0f1392434a970be15f1452ce1e7764f70f02936'
  const dcoreNetworkWSPaths = ['wss://hackathon2.decent.ch:8090']
  dcore.initialize({ chainId, dcoreNetworkWSPaths }, false)
  const connection = dcore.connection()
  connection.openConnection().then((res) => {
    console.log(connection.isConnected)
  }).catch((error) => {
    console.error(error)
  })
}

const maybeGenerate = function * ({ reason }) {
  if (reason === 'not-registered') {
    yield put(actions.generate.requested())
  }
}

const load = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const privateKeyWif = window.localStorage.getItem(`privateKey-${facebookUserID}`)
    if (!privateKeyWif) {
      yield put(actions.load.failed({ reason: 'no-private-key' }))
    } else {
      const privateKey = dcore.KeyPrivate.fromWif(privateKeyWif)
      const walletData = { privateKey }
      yield put(actions.load.succeeded({ walletData }))
    }
  } catch (error) {
    yield put(actions.generate.errored({ error }))
  }
}

const generate = function * () {
  console.log('GENERATE')
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const brainKey = dcore.Utils.suggestBrainKey()
    const [privateKey, publicKey] = dcore.Utils.generateKeys(brainKey)
    const privateKeyWif = privateKey.stringKey
    const publicKeyRaw = publicKey.stringKey
    window.localStorage.setItem(`privateKey-${facebookUserID}`, privateKeyWif)
    const addrStr = `${ADDRESS_PREFIX}-${facebookUserID}`
    const walletData = { publicKey: publicKeyRaw, addrStr }
    yield put(actions.generate.succeeded({ walletData, privateKey: privateKeyWif, mnemonic: brainKey }))
  } catch (error) {
    console.error(error)
    yield put(actions.generate.errored({ error }))
  }
}

const recover = function * ({ mnemonic, privateKey }) {
  yield put(actions.recover.failed({ reason: 'recover-not-implemented' }))
}

const refresh = function * () {
  yield take(oneOfTypes([
    ownTypes.GENERATE.succeeded,
    ownTypes.LOAD.succeeded,
    ownTypes.RECOVER.succeeded
  ]))
  const walletData = { balance: 100, addrStr: '0x123', unconfirmedBalance: 200, hasPendingTx: false }
  yield put(actions.refresh.succeeded({ walletData, changes: {} }))
}

const withdraw = function * ({ address, amount, fees }) {
  yield put(actions.withdraw.failed({ reason: 'withdraw-not-implemented' }))
}

const checkLastTx = function * () {
  yield put(actions.checkLastTx.succeeded({ hasPendingTx: false }))
}

export default function * () {
  yield all([
    fork(init),
    takeLatest(types.facebook.registration.CHECK.succeeded, load),
    takeLatest(types.facebook.registration.CHECK.failed, maybeGenerate),
    takeLatest(ownTypes.GENERATE.requested, generate),
    takeLatest(ownTypes.RECOVER.requested, recover),
    takeLatest(ownTypes.WITHDRAW.requested, withdraw),
    fork(refresh),
    fork(checkLastTx)
  ])
}
