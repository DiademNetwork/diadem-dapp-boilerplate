import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import ownTypes from './types'
import actions from './actions'
import stream from 'services/stream'

const fetch = function * ({ page = 1 }) {
  try {
    const { results: items, hasMore } = yield call(stream.fetchData, 'transactions', page)
    yield put(actions.fetch.succeeded({ list: items, hasMore }))
  } catch (error) {
    yield put(actions.fetch.errored({ error }))
  }
}

const successCallBack = function * ({ new: items }) {
  yield put(actions.received({ list: items }))
}

const suscribe = function * () {
  try {
    yield call(stream.suscribeWithCallBacks, 'transactions', successCallBack)
    yield put(actions.suscribe.succeeded())
  } catch (error) {
    yield put(actions.suscribe.errored({ error }))
  }
}

export default function * () {
  yield all([
    fork(fetch, {}),
    takeLatest(ownTypes.FETCH.requested, fetch),
    takeLatest(ownTypes.FETCH.succeeded, suscribe)
  ])
}
