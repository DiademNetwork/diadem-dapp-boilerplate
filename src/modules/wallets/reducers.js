import { merge } from 'modules/utils'
import T from './types'

const initialState = {}

export default function createReducer (state, {
  hasPendingTx,
  blockchainKey,
  data,
  reason,
  type,
  walletUtil: util
}) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.LOAD.succeeded: return merge(state)({ data, util, loadFailReason: 'none', status: 'loaded' })
    case T.LOAD.failed: return merge(state)({ loadFailReason: reason, status: 'failed' })
    case T.GENERATE.succeeded: return merge(state)({ [blockchainKey]: { ...data, status: 'generated', isRegistered: false, isRegistrationPending: true } })
    case T.RECOVER.requested: return merge(state)({ status: 'is-recovering' })
    case T.RECOVER.succeeded: return merge(state)({ data, util, loadFailReason: 'none', recoverFailReason: 'none', status: 'recovered' })
    case T.RECOVER.failed: return merge(state)({ recoverFailReason: reason, status: 'none' })
    case T.REFRESH.succeeded: return merge(state)({ ...data })
    case T.CHECK_LAST_TX.succeeded: return merge(state)({ hasPendingTx })
    case T.INFO_SAVED: return merge(state)({ [blockchainKey]: { status: 'recovery-info-saved' } })
    case T.CHECK_REGISTRATIONS.succeeded: return merge(state)({ ...data })
    case T.CHECK_REGISTRATIONS.failed: return merge(state)({ checkRegistrationFailReason: reason, isRegistered: false })
    default: return state
  }
}
