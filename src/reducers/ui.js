import T from '../actions/types'
import merge from './merge-state'

export default (state, { type }) => {
  if (typeof state === 'undefined') {
    return {
      isHelpDisplayed: false
    }
  }
  switch (type) {
    case T.UI_SHOW_HELP: return merge(state)({ isHelpDisplayed: true })
    case T.UI_HIDE_HELP: return merge(state)({ isHelpDisplayed: false })
    default: return state
  }
}
