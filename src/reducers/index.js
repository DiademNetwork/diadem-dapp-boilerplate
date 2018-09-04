import {
  ACHIEVEMENT_CONFIRM_REQUESTED,
  ACHIEVEMENT_CONFIRM_SUCCEEDED,
  ACHIEVEMENT_CONFIRM_FAILED,
  STREAM_FETCH_ACHIEVEMENTS_REQUESTED,
  STREAM_FETCH_ACHIEVEMENTS_SUCCEEDED,
  STREAM_FETCH_ACHIEVEMENTS_FAILED,
  SUPPORT_SEND_REQUESTED,
  SUPPORT_SEND_SUCCEEDED,
  SUPPORT_SEND_FAILED,
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS,
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} from './../actions/types'

const intialState = {
  facebook: {
    authenticationStatus: 'none',
    data: {}
  },
  wallet: {
    status: 'none',
    data: {},
    meta: {}
  },
  achievements: {
    confirmStatus: 'none',
    fetchStatus: 'none',
    data: []
  },
  support: {
    status: 'none'
  }
}

const reducers = (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }

  switch (action.type) {
    case WALLET_UPDATE_DATA:
      return { ...state, wallet: { ...state.wallet, data: action.data } }
    case WALLET_UPDATE_META:
      return { ...state, wallet: { ...state.wallet, meta: action.meta } }
    case WALLET_UPDATE_STATUS:
      return { ...state, wallet: { ...state.wallet, status: action.status } }

    case FACEBOOK_UPDATE_DATA:
      return { ...state, facebook: { ...state.facebook, data: action.data } }
    case FACEBOOK_UPDATE_AUTHENTICATION_STATUS:
      return { ...state, facebook: { ...state.facebook, authenticationStatus: 'succeeded' } }

    case SUPPORT_SEND_REQUESTED:
      return { ...state, support: { ...state.support, status: 'requested' } }
    case SUPPORT_SEND_SUCCEEDED:
      return { ...state, support: { ...state.support, status: 'succeeded' } }
    case SUPPORT_SEND_FAILED:
      return { ...state, support: { ...state.support, status: 'failed' } }

    case STREAM_FETCH_ACHIEVEMENTS_REQUESTED:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'requested' } }
    case STREAM_FETCH_ACHIEVEMENTS_SUCCEEDED:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'succeeded', data: action.payload.achievements } }
    case STREAM_FETCH_ACHIEVEMENTS_FAILED:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'failed' } }

    case ACHIEVEMENT_CONFIRM_REQUESTED:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'requested' } }
    case ACHIEVEMENT_CONFIRM_SUCCEEDED:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'succeeded' } }
    case ACHIEVEMENT_CONFIRM_FAILED:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'failed' } }
    default:
      return state
  }
}

export default reducers
