import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import ownTypes from './types'
import actions from './actions'
import stream from 'services/stream'

const fetch = function * () {
  try {
    const { results: items } = yield call(stream.fetchData, 'achievements')
    yield put(actions.fetch.succeeded({ list: items }))
  } catch (error) {
    yield put(actions.fetch.errored({ error }))
  }
}

const successCallBack = function * ({ new: items }) {
  yield put(actions.received({ list: items }))
}

const suscribe = function * () {
  try {
    yield call(stream.suscribeWithCallBacks, 'achievements', successCallBack)
    yield put(actions.suscribe.succeeded())
  } catch (error) {
    yield put(actions.suscribe.errored({ error }))
  }
}

export const rootSaga = function * () {
  yield all([
    fork(fetch),
    takeLatest(ownTypes.FETCH.succeeded, suscribe)
  ])
}
