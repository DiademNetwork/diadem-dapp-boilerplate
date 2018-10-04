import { all, call, fork, put } from 'redux-saga/effects'
import actions from './actions'
import api from 'services/api'

const fetch = function * () {
  try {
    const { usersList: list } = yield call(api.fetchUsers)
    yield put(actions.fetch.succeeded({ list }))
  } catch (error) {
    yield put(actions.fetch.failed(error))
  }
}

export default function * () {
  yield all([
    fork(fetch)
  ])
}
