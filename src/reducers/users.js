import types from '../actions/types'
import * as R from 'ramda'

const {
  ASYNC_USERS_FETCH
} = types

const intialState = {
  data: {},
  fetchStatus: 'none'
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  const mergeState = R.merge(state)
  switch (action.type) {
    case ASYNC_USERS_FETCH.requested: return mergeState({ fetchStatus: 'requested' })
    case ASYNC_USERS_FETCH.succeeded: return mergeState({ fetchStatus: 'succeeded', data: action.data })
    case ASYNC_USERS_FETCH.failed: return mergeState({ fetchStatus: 'failed' })
    default:
      return state
  }
}
