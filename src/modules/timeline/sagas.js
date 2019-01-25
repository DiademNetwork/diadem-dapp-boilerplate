import { all, call, put, select, take, takeLatest } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import T from 'modules/types'
import S from 'modules/selectors'
import ownT from './types'
import ownA from './actions'
import stream from 'services/stream'

const fetch = function * ({ page }) {
  try {
    const userAddress = yield select(S.wallets.primaryAddress)
    const { results: items, hasMore } = yield call(stream.fetchData, 'timeline', userAddress, page)
    yield put(ownA.fetch.succeeded({ list: items, hasMore, userAddress }))
  } catch (error) {
    yield put(ownA.fetch.errored({ error }))
  }
}

const successCallBack = function * ({ new: items }) {
  yield put(ownA.received({ list: items }))
}

const subscribe = function * ({ userAddress }) {
  let callbackObj = {}
  const channel = eventChannel(emitter => {
    callbackObj.call = emitter
    return () => {}
  })
  try {
    yield call(stream.subscribeWithCallBacks, 'timeline', userAddress, callbackObj.call)
    yield put(ownA.subscribe.succeeded())
    while (true) {
      const data = yield take(channel)
      yield call(successCallBack, data)
    }
  } catch (error) {
    yield put(ownA.subscribe.errored({ error }))
  }
}

export default function * () {
  yield all([
    takeLatest(T.wallets.CONNECT.succeeded, fetch),
    takeLatest(T.wallets.GET_GETSTREAM_TOKEN.succeeded, fetch),
    takeLatest(T.wallets.GET_GETSTREAM_TOKEN.succeeded, subscribe),
    takeLatest(ownT.FETCH.requested, fetch)
  ])
}
