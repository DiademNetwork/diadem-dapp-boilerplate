import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  data: {}
}

export default function createReducer (state, { type, data }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.LOGGED: return merge(state)({ data })
    default: return state
  }
}
