import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  data: null,
  hasPendingTx: false,
  infoSaved: false,
  loadFailReason: 'none',
  mnemonic: '',
  privateKey: '',
  recoverFailReason: 'none',
  status: 'none',
  util: null
}

export default function createReducer (state, {
  hasPendingTx,
  mnemonic,
  privateKey,
  reason,
  type,
  walletUtil: util,
  walletData: data
}) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.LOAD.succeeded: return merge(state)({ data, util, loadFailReason: 'none', status: 'loaded' })
    case types.LOAD.failed: return merge(state)({ loadFailReason: reason })
    case types.GENERATE.succeeded: return merge(state)({ data, mnemonic, privateKey, util })
    case types.RECOVER.succeeded: return merge(state)({ data, util, recoverFailReason: 'none' })
    case types.RECOVER.failed: return merge(state)({ recoverFailReason: reason })
    case types.REFRESH.succeeded: return merge(state)({ data })
    case types.CHECK_LAST_TX.succeeded: return merge(state)({ hasPendingTx })
    case types.INFO_SAVED: return merge(state)({ infoSaved: true })
    default: return state
  }
}
