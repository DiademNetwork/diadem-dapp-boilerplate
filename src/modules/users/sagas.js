import { all, call, put, takeLatest } from 'redux-saga/effects'
import ownTypes from './types'
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
    takeLatest(ownTypes.FETCH.requested, fetch)
  ])
}
