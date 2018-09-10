import types from '../actions/types'
const {
  ASYNC_STREAM_FETCH_TRANSACTIONS
} = types

const intialState = {
  fetchStatus: 'none',
  data: []
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  switch (action.type) {
    case ASYNC_STREAM_FETCH_TRANSACTIONS.requested:
      return { ...state, fetchStatus: 'requested' }
    case ASYNC_STREAM_FETCH_TRANSACTIONS.succeeded:
      return { ...state, fetchStatus: 'succeeded', data: action.data }
    case ASYNC_STREAM_FETCH_TRANSACTIONS.failed:
      return { ...state, fetchStatus: 'failed' }
    default:
      return state
  }
}
