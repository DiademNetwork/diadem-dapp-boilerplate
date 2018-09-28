import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  list: []
}

export default function createReducer (state, { type, list }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.FETCH.succeeded: return merge(state)({ list })
    default: return state
  }
}
