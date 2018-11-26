import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  createStatus: 'none'
}

export default function createReducer (state, { type, list }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.CREATE.succeeded: return merge(state)({ createStatus: 'succeeded' })
    default: return state
  }
}
