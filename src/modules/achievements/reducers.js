import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  hasUnread: false,
  list: []
}

export default function createReducer (state, { type, list }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.FETCH.succeeded: return merge(state)({ list })
    case types.RECEIVED: return merge(state)({ list, hasUnread: true })
    default: return state
  }
}
