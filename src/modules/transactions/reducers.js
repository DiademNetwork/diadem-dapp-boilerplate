import { merge } from 'modules/utils'
import T from './types'

const initialState = {
  list: [],
  hasMore: null,
  hasUnread: false,
  fetchStatus: 'none'
}

export default function createReducer (state, { type, list, hasMore }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.FETCH.requested: return merge()(state)({ fetchStatus: 'requested' })
    case T.FETCH.succeeded: return merge()(state)({ list, hasMore, fetchStatus: 'succeeded' })
    case T.RECEIVED: return merge()(state)({ list, hasUnread: true })
    case T.OPENNED: return merge()(state)({ hasUnread: false })
    default: return state
  }
}
