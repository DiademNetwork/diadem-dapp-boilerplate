import types from '../actions/types'
const {
  UI_SHOW_HELP,
  UI_HIDE_HELP
} = types

const intialState = {
  isHelpDisplayed: false
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  switch (action.type) {
    case UI_SHOW_HELP:
      return { ...state, isHelpDisplayed: true }
    case UI_HIDE_HELP:
      return { ...state, isHelpDisplayed: false }
    default:
      return state
  }
}
