import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  checkFailReason: 'none',
  isRegistered: false
}

export default function createReducer (state, { type, reason }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.CHECK.succeeded: return merge(state)({ checkFailReason: 'none', isRegistered: true })
    case types.CHECK.failed: return merge(state)({ checkFailReason: reason, isRegistered: false })
    default: return state
  }
}
