import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import api from 'services/api'
import selectors from 'modules/selectors'
import types from 'modules/types'

const check = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    const { exists, pending } = yield call(api.checkFacebookRegistration, { user: facebookUserID })
    exists
      ? yield put(actions.check.succeeded())
      : yield put(actions.check.failed({ reason: pending ? 'is-pending' : 'not-registered' }))
  } catch (error) {
    yield put(actions.check.errored({ error }))
  }
}

const register = function * ({ walletData }) {
  try {
    const facebookAccessToken = yield select(selectors.facebook.login.accessToken)
    const facebookName = yield select(selectors.facebook.login.name)
    const facebookUserID = yield select(selectors.facebook.login.userID)
    yield call(api.registerUser, {
      address: walletData.addrStr,
      name: facebookName,
      user: facebookUserID,
      token: facebookAccessToken
    })
    yield put(actions.register.succeeded())
  } catch (error) {
    yield put(actions.register.errored({ error }))
  }
}

export const rootSaga = function * () {
  yield all([
    takeLatest(types.facebook.login.LOGGED, check),
    takeLatest(types.wallets.qtum.GENERATE.succeeded, register)
  ])
}
