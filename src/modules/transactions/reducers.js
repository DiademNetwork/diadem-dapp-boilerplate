import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  list: [],
  hasMore: null,
  hasUnread: false
}

export default function createReducer (state, { type, list, hasMore }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.FETCH.succeeded: return merge(state)({ list, hasMore })
    case types.RECEIVED: return merge(state)({ list, hasUnread: true })
    default: return state
  }
}
