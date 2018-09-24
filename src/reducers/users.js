import T from '../actions/types'
import merge from './merge-state'

export default (state, { type, data }) => {
  if (typeof state === 'undefined') {
    return {
      data: {
        items: []
      },
      fetchStatus: 'none'
    }
  }
  switch (type) {
    case T.ASYNC_USERS_FETCH.requested: return merge(state)({ fetchStatus: 'requested' })
    case T.ASYNC_USERS_FETCH.succeeded: return merge(state)({ fetchStatus: 'succeeded', data })
    case T.ASYNC_USERS_FETCH.failed: return merge(state)({ fetchStatus: 'failed' })
    default: return state
  }
}
