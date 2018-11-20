import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects'
import ownA from './actions'
import api from 'services/api'
import S from 'modules/selectors'
import T from 'modules/types'

console.log({ S, T })

const CHECK_USER_REGISTRATION_INTERVAL = 5000 // in ms

const check = function * () {
  try {
    const facebookUserID = yield select(S.login.userID)
    let { exists, pending } = yield call(api.checkFacebookRegistration, { user: facebookUserID })
    if (exists) {
      yield put(ownA.check.succeeded())
    } else if (!pending) {
      yield put(ownA.check.failed({ reason: 'not-registered' }))
    } else {
      while (pending) {
        yield delay(CHECK_USER_REGISTRATION_INTERVAL)
        const { pending: newPending } = yield call(api.checkFacebookRegistration, { user: facebookUserID })
        pending = newPending
      }
    }
  } catch (error) {
    yield put(ownA.check.errored({ error }))
  }
}

const register = function * ({ walletData }) {
  try {
    const facebookAccessToken = yield select(S.login.accessToken)
    const facebookName = yield select(S.login.name)
    const facebookUserID = yield select(S.login.userID)
    yield call(api.registerUser, {
      address: walletData.addrStr,
      name: facebookName,
      user: facebookUserID,
      token: facebookAccessToken
    })
    yield put(ownA.register.succeeded())
  } catch (error) {
    yield put(ownA.register.errored({ error }))
  }
}

export default function * () {
  yield all([
    takeLatest(T.login.LOGGED, check),
    takeLatest(T.wallets.GENERATE.succeeded, register)
  ])
}
