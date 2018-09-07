import types from '../actions/types'
import * as R from 'ramda'
const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_CREATE,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ASYNC_STREAM_FETCH_ACHIEVEMENTS
} = types

const intialState = {
  createStatus: 'none',
  supportStatus: 'none',
  confirmStatus: 'none',
  fetchStatus: 'none',
  data: []
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  const mergeState = R.merge(state)
  switch (action.type) {
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.requested: return mergeState({ fetchStatus: 'requested' })
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.succeeded: return mergeState({ fetchStatus: 'succeeded', data: action.data })
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.failed: return mergeState({ fetchStatus: 'failed' })
    case ASYNC_ACHIEVEMENT_CONFIRM.requested: return mergeState({ confirmStatus: 'requested' })
    case ASYNC_ACHIEVEMENT_CONFIRM.succeeded: return mergeState({ confirmStatus: 'succeeded' })
    case ASYNC_ACHIEVEMENT_CONFIRM.failed: return mergeState({ confirmStatus: 'failed' })
    case ASYNC_ACHIEVEMENT_CREATE.requested: return mergeState({ createStatus: 'requested' })
    case ASYNC_ACHIEVEMENT_CREATE.succeeded: return mergeState({ createStatus: 'succeeded' })
    case ASYNC_ACHIEVEMENT_CREATE.failed: return mergeState({ createStatus: 'failed' })
    case ASYNC_ACHIEVEMENT_SUPPORT.request: return mergeState({ supportStatus: 'requested' })
    case ASYNC_ACHIEVEMENT_SUPPORT.succeeded: return mergeState({ supportStatus: 'succeeded' })
    case ASYNC_ACHIEVEMENT_SUPPORT.failed: return mergeState({ supportStatus: 'failed' })
    default: return state
  }
}
