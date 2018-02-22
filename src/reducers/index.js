import { INCREMENT_CLICK_COUNT } from './../actions/types'

const intialState = {
  clickCount: 0
}

const reducers = (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }

  switch (action.type) {
    case INCREMENT_CLICK_COUNT:
      return { ...state, clickCount: ++state.clickCount }

    default:
      return state
  }
}

export default reducers
