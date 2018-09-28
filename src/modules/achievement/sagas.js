import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import ownTypes from './types'
import actions from './actions'
import api from 'services/api'
import selectors from 'modules/selectors'

const create = function * (payload) {
  try {
    yield call(handleCreateUpdate, payload)
    yield put(actions.create.succeeded())
  } catch (error) {
    yield put(actions.create.errored({ error }))
  }
}

const update = function * (payload) {
  try {
    yield call(handleCreateUpdate, payload)
    yield put(actions.update.succeeded())
  } catch (error) {
    yield put(actions.update.errored({ error }))
  }
}

const handleCreateUpdate = function * ({ link, previousLink = '', title }) {
  yield call(api.createUpdateAchievement, {
    address: yield select(selectors.wallets.qtum.address),
    link,
    name: yield select(selectors.facebook.login.name),
    previousLink,
    title,
    token: yield select(selectors.facebook.login.accessToken),
    user: yield select(selectors.facebook.login.userID)
  })
}

const confirm = function * (payload) {
  try {
    yield call(api.confirmAchievement, payload)
    yield put(actions.confirm.succeeded())
  } catch (error) {
    yield put(actions.confirm.errored({ error }))
  }
}

const support = function * ({ amount, fees, link }) {
  try {
    const { data: { address, encodedData } } = yield call(api.encodeSupport, { link })
    const walletUtil = yield select(selectors.wallets.qtum.util)
    const rawTx = yield call(walletUtil.generateContractSendTx, address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    yield call(api.supportAchievement, {
      address: yield select(selectors.wallets.qtum.address),
      link,
      rawTx,
      token: yield select(selectors.facebook.login.accessToken),
      user: yield select(selectors.facebook.login.userID)
    })
    yield put(actions.support.succeeded())
  } catch (error) {
    yield put(actions.support.errored({ error }))
  }
}

const deposit = function * ({ amount, fees, link, witnessAddress, witnessName, witnessUserID }) {
  try {
    const { data: { address, encodedData } } = yield call(api.encodeDeposit, { link, witness: witnessAddress })
    const walletUtil = yield select(selectors.wallets.qtum.util)
    const rawTx = yield call(walletUtil.generateContractSendTx, address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    yield call(api.depositForAchievement, {
      address: yield select(selectors.wallets.qtum.address),
      link,
      rawTx,
      token: yield select(selectors.facebook.login.accessToken),
      user: yield select(selectors.facebook.login.userID),
      witness: witnessUserID,
      witnessName
    })
    yield put(actions.support.succeeded())
  } catch (error) {
    yield put(actions.support.errored({ error }))
  }
}

export const rootSaga = function * () {
  yield all([
    takeLatest(ownTypes.CREATE.succeeded, create),
    takeLatest(ownTypes.UPDATE.succeeded, update),
    takeLatest(ownTypes.CONFIRM.succeeded, confirm),
    takeLatest(ownTypes.SUPPORT.succeeded, support),
    takeLatest(ownTypes.DEPOSIT.succeeded, deposit)
  ])
}
