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
  STORE_WALLET_INFO,
  STORE_FACEBOOK_INFO
} from './../actions/types'

const intialState = {
  fbInfo: null,
  walletInfo: null,
  wallet: null,
  achievements: {
    confirmStatus: 'none',
    fetchStatus: 'none',
    data: []
  },
  support: {
    status: 'none'
  }
}

const reducers = (state, { type, payload }) => {
  if (typeof state === 'undefined') {
    return intialState
  }

  switch (type) {
    case STORE_WALLET_INFO:
      const { wallet, walletInfo } = payload
      return { ...state, wallet, walletInfo }

    case STORE_FACEBOOK_INFO:
      const { fbInfo } = payload
      return { ...state, fbInfo }

    case SUPPORT_SEND_REQUESTED:
      return { ...state, support: { ...state.support, status: 'requested' } }
    case SUPPORT_SEND_SUCCEEDED:
      return { ...state, support: { ...state.support, status: 'succeeded' } }
    case SUPPORT_SEND_FAILED:
      return { ...state, support: { ...state.support, status: 'failed' } }

    case STREAM_FETCH_ACHIEVEMENTS_REQUESTED:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'requested' } }
    case STREAM_FETCH_ACHIEVEMENTS_SUCCEEDED:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'succeeded', data: payload.achievements } }
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
