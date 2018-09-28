import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  data: null,
  util: null,
  loadFailReason: 'none',
  recoverFailReason: 'none'
}

export default function createReducer (state, { type, walletUtil: util, walletData: data, reason }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.LOAD.succeeded: return merge(state)({ data, util, loadFailReason: 'none' })
    case types.LOAD.failed: return merge(state)({ loadFailReason: reason })
    case types.GENERATE.succeeded: return merge(state)({ data, util })
    case types.RECOVER.succeeded: return merge(state)({ data, util, recoverFailReason: 'none' })
    case types.RECOVER.failed: return merge(state)({ recoverFailReason: reason })
    case types.REFRESH.succeeded: return merge(state)({ data })
    default: return state
  }
}
