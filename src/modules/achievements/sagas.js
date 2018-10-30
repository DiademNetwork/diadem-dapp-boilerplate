import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
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
  let callbackObj = {}
  const channel = eventChannel(emitter => {
    callbackObj.call = emitter
    return () => {}
  })
  try {
    yield call(stream.suscribeWithCallBacks, 'achievements', callbackObj.call)
    yield put(actions.suscribe.succeeded())
    while (true) {
      const data = yield take(channel)
      yield call(successCallBack, data)
    }
  } catch (error) {
    yield put(actions.suscribe.errored({ error }))
  }
}

export default function * () {
  yield all([
    fork(fetch),
    takeLatest(ownTypes.FETCH.succeeded, suscribe)
  ])
}
