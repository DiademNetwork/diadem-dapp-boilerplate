import T from '../actions/types'
import merge from './merge-state'

export default (state, { type, data, meta, ...action }) => {
  if (typeof state === 'undefined') {
    return {
      status: 'none',
      data: {},
      meta: {
        hasPendingTransactions: false,
        isRegistrationPending: false,
        isUserRegistered: false
      }
    }
  }
  switch (type) {
    case T.WALLET_UPDATE_DATA: return merge(state)(data)
    case T.WALLET_UPDATE_META: return merge(state)(meta)
    case T.WALLET_UPDATE_STATUS: return merge(state)({ status: action.status })
    default: return state
  }
}
