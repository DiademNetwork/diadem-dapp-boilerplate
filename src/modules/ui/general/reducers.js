import { merge } from 'modules/utils'
import types from './types'

const initialState = {
  isHelpDisplayed: false
}

export default function createReducer (state, { type }) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case types.TOGGLE_HELP: return merge(state)({ isHelpDisplayed: !state.isHelpDisplayed })
    default: return state
  }
}
