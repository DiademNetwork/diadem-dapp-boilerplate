import types from '../actions/types'
const {
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS
} = types

const intialState = {
  status: 'none',
  data: {},
  meta: {
    isRegistrationPending: false,
    isUserRegistered: false
  }
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  switch (action.type) {
    case WALLET_UPDATE_DATA:
      return { ...state, data: action.data }
    case WALLET_UPDATE_META:
      return { ...state, meta: { ...state.meta, ...action.meta } }
    case WALLET_UPDATE_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}
