import T from '../actions/types'
import merge from './merge-state'

export default (state, { type, data, meta }) => {
  if (typeof state === 'undefined') {
    return {
      fetchStatus: 'none',
      data: {
        items: []
      },
      meta: {
        hasMore: true,
        hasUnread: false
      }
    }
  }
  switch (type) {
    case T.TRANSACTIONS_UPDATE_DATA: return merge(state)(data)
    case T.TRANSACTIONS_UPDATE_META: return merge(state)(meta)

    case T.ASYNC_TRANSACTIONS_FETCH.requested: return merge(state)({ fetchStatus: 'requested' })
    case T.ASYNC_TRANSACTIONS_FETCH.succeeded: return merge(state)({ fetchStatus: 'succeeded', data, meta })
    case T.ASYNC_TRANSACTIONS_FETCH.failed: return merge(state)({ fetchStatus: 'failed' })
    default:
      return state
  }
}
