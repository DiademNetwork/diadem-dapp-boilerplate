import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import ownT from './types'
import ownA from './actions'
import api from 'services/api'
import S from 'modules/selectors'
import blockchains from 'configurables/blockchains'

const create = function * (payload) {
  try {
    yield call(handleCreateUpdate, payload)
    yield put(ownA.create.succeeded())
  } catch (error) {
    yield put(ownA.create.errored({ error }))
  }
}

const update = function * (payload) {
  try {
    yield call(handleCreateUpdate, payload)
    yield put(ownA.update.succeeded())
  } catch (error) {
    yield put(ownA.update.errored({ error }))
  }
}

const handleCreateUpdate = function * ({ link, previousLink = '', title }) {
  const primaryBlockchainKey = blockchains.primary.key
  yield call(api.createUpdateAchievement(blockchains.primary.key), {
    address: yield select(S.wallets.address(primaryBlockchainKey)),
    link,
    name: yield select(S.login.userName),
    previousLink,
    title,
    token: yield select(S.login.userAccessToken),
    user: yield select(S.login.userID)
  })
}

const confirm = function * (payload) {
  try {
    yield call(api.confirmAchievement, payload)
    yield put(ownA.confirm.succeeded())
  } catch (error) {
    yield put(ownA.confirm.errored({ error }))
  }
}

const support = function * ({ amount, fees, link }) {
  try {
    const { address, encodedData } = yield call(api.encodeSupport, { link })
    const walletUtil = yield select(S.wallets.util)
    const rawTx = yield call([walletUtil, 'generateContractSendTx'], address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    yield call(api.supportAchievement, {
      address: yield select(S.wallets.address),
      link,
      rawTx,
      token: yield select(S.login.userAccessToken),
      user: yield select(S.login.userID)
    })
    yield put(ownA.support.succeeded())
  } catch (error) {
    console.log(error)
    yield put(ownA.support.errored({ error }))
  }
}

const deposit = function * ({ amount, fees, link, witnessAddress, witnessName, witnessUserID }) {
  try {
    const { address, encodedData } = yield call(api.encodeDeposit, { link, witness: witnessAddress })
    const walletUtil = yield select(S.wallets.util)
    const rawTx = yield call([walletUtil, 'generateContractSendTx'], address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    yield call(api.depositForAchievement, {
      address: yield select(S.wallets.address),
      link,
      rawTx,
      token: yield select(S.login.userAccessToken),
      user: yield select(S.login.userID),
      witness: witnessUserID,
      witnessName
    })
    yield put(ownA.deposit.succeeded())
  } catch (error) {
    console.log(error)
    yield put(ownA.deposit.errored({ error }))
  }
}

export default function * () {
  yield all([
    takeLatest(ownT.CREATE.requested, create),
    takeLatest(ownT.UPDATE.requested, update),
    takeLatest(ownT.CONFIRM.requested, confirm),
    takeLatest(ownT.SUPPORT.requested, support),
    takeLatest(ownT.DEPOSIT.requested, deposit)
  ])
}
