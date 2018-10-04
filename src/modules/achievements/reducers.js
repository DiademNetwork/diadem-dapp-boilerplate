import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  fetchStatus: 'none',
  hasUnread: false,
  list: []
}

export default function createReducer (state, { type, list }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.FETCH.requested: return merge(state)({ fetchStatus: 'requested' })
    case types.FETCH.succeeded: return merge(state)({ list, fetchStatus: 'succeeded' })
    case types.RECEIVED: return merge(state)({ list, hasUnread: true })
    default: return state
  }
}
