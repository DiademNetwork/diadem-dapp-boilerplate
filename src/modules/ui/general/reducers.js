import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  helpDisplay: 'none'
}

export default function createReducer (state, { type, helpDisplay = 'none' }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.TOGGLE_HELP: return merge(state)({ helpDisplay })
    default: return state
  }
}
