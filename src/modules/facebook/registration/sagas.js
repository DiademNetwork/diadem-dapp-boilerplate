import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects'
import actions from './actions'
import api from 'services/api'
import selectors from 'modules/selectors'
import T from 'modules/types'

const CHECK_USER_REGISTRATION_INTERVAL = 5000 // in ms

const check = function * () {
  try {
    const facebookUserID = yield select(selectors.facebook.login.userID)
    let { exists, pending } = yield call(api.checkFacebookRegistration, { user: facebookUserID })
    if (exists) {
      yield put(actions.check.succeeded())
    } else if (!pending) {
      yield put(actions.check.failed({ reason: 'not-registered' }))
    } else {
      while (pending) {
        yield delay(CHECK_USER_REGISTRATION_INTERVAL)
        const { pending: newPending } = yield call(api.checkFacebookRegistration, { user: facebookUserID })
        pending = newPending
      }
    }
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

export default function * () {
  yield all([
    takeLatest(T.facebook.login.LOGGED, check),
    takeLatest(T.wallets.qtum.GENERATE.succeeded, register)
  ])
}
