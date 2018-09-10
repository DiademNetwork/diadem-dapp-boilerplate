import types from '../actions/types'
import * as R from 'ramda'
const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_CREATE,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ACHIEVEMENTS_UPDATE_DATA,
  ACHIEVEMENTS_UPDATE_META
} = types

const intialState = {
  createStatus: 'none',
  supportStatus: 'none',
  confirmStatus: 'none',
  data: [],
  meta: {
    loadedOnce: false,
    notificationCount: 0
  }
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  const mergeState = R.merge(state)
  switch (action.type) {
    case ACHIEVEMENTS_UPDATE_DATA: return mergeState({ data: action.data })
    case ACHIEVEMENTS_UPDATE_META: return mergeState({ meta: { ...state.meta, ...action.meta } })
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
