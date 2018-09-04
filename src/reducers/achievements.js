import types from '../actions/types'
const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ASYNC_STREAM_FETCH_ACHIEVEMENTS
} = types

const intialState = {
  supportStatus: 'none',
  confirmStatus: 'none',
  fetchStatus: 'none',
  data: []
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  switch (action.type) {
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.requested:
      return { ...state, fetchStatus: 'requested' }
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.succeeded:
      return { ...state, fetchStatus: 'succeeded', data: action.payload.achievements }
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.failed:
      return { ...state, fetchStatus: 'failed' }

    case ASYNC_ACHIEVEMENT_CONFIRM.requested:
      return { ...state, confirmStatus: 'requested' }
    case ASYNC_ACHIEVEMENT_CONFIRM.succeeded:
      return { ...state, confirmStatus: 'succeeded' }
    case ASYNC_ACHIEVEMENT_CONFIRM.failed:
      return { ...state, confirmStatus: 'failed' }

    case ASYNC_ACHIEVEMENT_SUPPORT.request:
      return { ...state, supportStatus: 'requested' }
    case ASYNC_ACHIEVEMENT_SUPPORT.succeeded:
      return { ...state, supportStatus: 'succeeded' }
    case ASYNC_ACHIEVEMENT_SUPPORT.failed:
      return { ...state, supportStatus: 'failed' }
    default:
      return state
  }
}
