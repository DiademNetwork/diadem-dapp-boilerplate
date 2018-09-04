import types from '../actions/types'
const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_STREAM_FETCH_ACHIEVEMENTS,
  ASYNC_STREAM_FETCH_USER_TRANSACTIONS,
  ASYNC_SUPPORT_SEND,
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS,
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} = types

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
  },
  userTransactions: {
    fetchStatus: 'none',
    data: []
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

    case ASYNC_SUPPORT_SEND.request:
      return { ...state, support: { ...state.support, status: 'requested' } }
    case ASYNC_SUPPORT_SEND.succeeded:
      return { ...state, support: { ...state.support, status: 'succeeded' } }
    case ASYNC_SUPPORT_SEND.failed:
      return { ...state, support: { ...state.support, status: 'failed' } }

    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.requested:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'requested' } }
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.succeeded:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'succeeded', data: action.payload.achievements } }
    case ASYNC_STREAM_FETCH_ACHIEVEMENTS.failed:
      return { ...state, achievements: { ...state.achievements, fetchStatus: 'failed' } }

    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.requested:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'requested' } }
    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.succeeded:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'succeeded', data: action.payload.userTransactions } }
    case ASYNC_STREAM_FETCH_USER_TRANSACTIONS.failed:
      return { ...state, userTransactions: { ...state.userTransactions, fetchStatus: 'failed' } }

    case ASYNC_ACHIEVEMENT_CONFIRM.requested:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'requested' } }
    case ASYNC_ACHIEVEMENT_CONFIRM.succeeded:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'succeeded' } }
    case ASYNC_ACHIEVEMENT_CONFIRM.failed:
      return { ...state, achievements: { ...state.achievements, confirmStatus: 'failed' } }
    default:
      return state
  }
}

export default reducers
