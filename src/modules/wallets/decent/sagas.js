import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import actions from './actions'
import selectors from 'modules/selectors'
import types from 'modules/types'
import ownTypes from './types'

import * as dcore from 'dcorejs'

const WAIT_INTERVAL = 2000
const ADDRESS_PREFIX = 'fb'

const init = function * () {
  const chainId = '9c54faed15d4089d3546ac5eb0f1392434a970be15f1452ce1e7764f70f02936'
  const dcoreNetworkWSPaths = ['wss://hackathon2.decent.ch:8090']
  dcore.initialize({ chainId, dcoreNetworkWSPaths })
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
    const privateKey = window.localStorage.getItem(`privateKey-${facebookUserID}`)
    if (!privateKey) {
      yield put(actions.load.failed({ reason: 'no-private-key' }))
    } else {
      yield put(actions.load.failed({ reason: 'load-not-implemented' }))
    }
  } catch (error) {
    yield put(actions.generate.errored({ error }))
  }
}

const generate = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const brainKey = dcore.account().suggestBrainKey()
    const [privateKey, publicKey] = dcore.Utils.generateKeys(brainKey)
    window.localStorage.setItem(`privateKey-${facebookUserID}`, privateKey)
    const addrStr = `${ADDRESS_PREFIX}-${facebookUserID}`
    yield put(actions.generate.succeeded({ publicKey, addrStr }))
  } catch (error) {
    yield put(actions.generate.errored({ error }))
  }
}

const recover = function * ({ mnemonic, privateKey }) {
  yield put(actions.recover.failed({ reason: 'recover-not-implemented' }))
}

const refresh = function * () {
  yield put(actions.refresh.failed({ reason: 'refresh-not-implemented' }))
}

const withdraw = function * ({ address, amount, fees }) {
  yield put(actions.withdraw.failed({ reason: 'withdraw-not-implemented' }))
}

const checkLastTx = function * () {
  yield put(actions.checkLastTx.succeeded({ hasPendingTx: true }))
  yield call(delay, WAIT_INTERVAL)
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
