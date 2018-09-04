import types from '../actions/types'
const {
  ASYNC_STREAM_FETCH_USER_TRANSACTIONS
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
    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.requested:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'requested' } }
    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.succeeded:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'succeeded', data: action.payload.userTransactions } }
    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.failed:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'failed' } }
    default:
      return state
  }
}
