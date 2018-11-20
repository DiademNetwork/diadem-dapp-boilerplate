import { all, call, fork, put } from 'redux-saga/effects'
import ownA from './actions'
import api from 'services/api'

const fetch = function * () {
  try {
    const { usersList: list } = yield call(api.fetchUsers)
    yield put(ownA.fetch.succeeded({ list }))
  } catch (error) {
    yield put(ownA.fetch.failed(error))
  }
}

export default function * () {
  yield all([
    fork(fetch)
  ])
}
