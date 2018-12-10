import { merge } from 'modules/utils'
import T from './types'

const initialState = {}

export default function createReducer (state, {
  hasPendingTx,
  blockchainKey,
  data,
  status,
  type
}) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.LOAD.succeeded: return merge(state)({ [blockchainKey]: { ...data, loadFailReason: 'none', status: 'loaded' } })
    case T.LOAD.failed: return merge(state)({ [blockchainKey]: { status } })
    case T.GENERATE.succeeded: return merge(state)({ [blockchainKey]: { ...data, status: 'generated', isRegistered: false, isRegistrationPending: true } })
    case T.RECOVER.requested: return merge(state)({ [blockchainKey]: { status: 'is-recovering' } })
    case T.RECOVER.succeeded: return merge(state)({ [blockchainKey]: { ...data, status: 'recovered' } })
    case T.RECOVER.failed: return merge(state)({ [blockchainKey]: { status } })
    case T.REFRESH.succeeded: return merge(state)({ ...data })
    case T.REGISTER.succeeded: return merge(state)({ [blockchainKey]: { isRegistered: false, isRegistrationPending: true } })
    case T.CHECK_LAST_TX.succeeded: return merge(state)({ hasPendingTx })
    case T.INFO_SAVED: return merge(state)({ [blockchainKey]: { status: 'recovery-info-saved' } })
    case T.CHECK_REGISTRATIONS.succeeded: return merge(state)({ ...data })
    default: return state
  }
}
