import T from '../actions/types'
import merge from './merge-state'

export default (state, { type, data, meta }) => {
  if (typeof state === 'undefined') {
    return {
      createStatus: 'none',
      depositStatus: 'none',
      fetchStatus: 'none',
      supportStatus: 'none',
      confirmStatus: 'none',
      data: {
        items: []
      },
      meta: {
        hasUnread: false
      }
    }
  }

  switch (type) {
    case T.ACHIEVEMENTS_UPDATE_DATA: return merge(state)({ data })
    case T.ACHIEVEMENTS_UPDATE_META: return merge(state)({ meta })

    case T.ASYNC_ACHIEVEMENTS_FETCH.requested: return merge(state)({ fetchStatus: 'requested' })
    case T.ASYNC_ACHIEVEMENTS_FETCH.succeeded: return merge(state)({ fetchStatus: 'succeeded', data })
    case T.ASYNC_ACHIEVEMENTS_FETCH.failed: return merge(state)({ fetchStatus: 'failed' })

    case T.ASYNC_ACHIEVEMENT_CONFIRM.requested: return merge(state)({ confirmStatus: 'requested' })
    case T.ASYNC_ACHIEVEMENT_CONFIRM.succeeded: return merge(state)({ confirmStatus: 'succeeded' })
    case T.ASYNC_ACHIEVEMENT_CONFIRM.failed: return merge(state)({ confirmStatus: 'failed' })

    case T.ASYNC_ACHIEVEMENT_CREATE.requested: return merge(state)({ createStatus: 'requested' })
    case T.ASYNC_ACHIEVEMENT_CREATE.succeeded: return merge(state)({ createStatus: 'succeeded' })
    case T.ASYNC_ACHIEVEMENT_CREATE.failed: return merge(state)({ createStatus: 'failed' })

    case T.ASYNC_ACHIEVEMENT_SUPPORT.requested: return merge(state)({ supportStatus: 'requested' })
    case T.ASYNC_ACHIEVEMENT_SUPPORT.succeeded: return merge(state)({ supportStatus: 'succeeded' })
    case T.ASYNC_ACHIEVEMENT_SUPPORT.failed: return merge(state)({ supportStatus: 'failed' })

    case T.ASYNC_ACHIEVEMENT_DEPOSIT.requested: return merge(state)({ depositStatus: 'requested' })
    case T.ASYNC_ACHIEVEMENT_DEPOSIT.succeeded: return merge(state)({ depositStatus: 'succeeded' })
    case T.ASYNC_ACHIEVEMENT_DEPOSIT.failed: return merge(state)({ depositStatus: 'failed' })
    default: return state
  }
}
