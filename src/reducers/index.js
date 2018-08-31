import {
  SUPPORT_SEND_REQUESTED,
  SUPPORT_SEND_SUCCEEDED,
  SUPPORT_SEND_FAILED,
  STORE_WALLET_INFO
} from './../actions/types'

const intialState = {
  walletInfo: null,
  wallet: null,
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
    case SUPPORT_SEND_REQUESTED:
      return { ...state, support: { ...state.support, status: 'requested' } }
    case SUPPORT_SEND_SUCCEEDED:
      return { ...state, support: { ...state.support, status: 'succeeded' } }
    case SUPPORT_SEND_FAILED:
      return { ...state, support: { ...state.support, status: 'failed' } }
    default:
      return state
  }
}

export default reducers
