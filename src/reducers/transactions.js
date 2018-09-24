import types from '../actions/types'
import * as R from 'ramda'

const {
  ASYNC_TRANSACTIONS_FETCH,
  TRANSACTIONS_UPDATE_META,
  TRANSACTIONS_UPDATE_DATA
} = types

const intialState = {
  data: [],
  fetchStatus: 'none',
  meta: {
    hasMore: true,
    hasUnread: false
  }
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  const mergeState = R.merge(state)
  switch (action.type) {
    case TRANSACTIONS_UPDATE_DATA: return mergeState({ data: [ ...state.data, ...action.data ] })
    case TRANSACTIONS_UPDATE_META: return mergeState({ meta: { ...state.meta, ...action.meta } })

    case ASYNC_TRANSACTIONS_FETCH.requested: return mergeState({ fetchStatus: 'requested' })
    case ASYNC_TRANSACTIONS_FETCH.succeeded: return mergeState({
      fetchStatus: 'succeeded',
      data: [ ...state.data, ...action.results ],
      meta: { ...state.meta, hasMore: action.hasMore }
    })
    case ASYNC_TRANSACTIONS_FETCH.failed: return mergeState({ fetchStatus: 'failed' })
    default:
      return state
  }
}
