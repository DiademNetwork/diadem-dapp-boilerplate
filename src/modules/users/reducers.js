import { merge } from 'modules/utils'
import T from './types'

const initialState = {
  fetchStatus: 'none',
  list: []
}

export default function createReducer (state, { type, list = [] }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.FETCH.requested: return merge()(state)({ fetchStatus: 'requested' })
    case T.FETCH.succeeded: return merge()(state)({ list, fetchStatus: 'succeeded' })
    default: return state
  }
}
