import types from '../actions/types'
const {
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} = types

const intialState = {
  authenticationStatus: 'none',
  data: {}
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  switch (action.type) {
    case FACEBOOK_UPDATE_DATA:
      return { ...state, data: action.data }
    case FACEBOOK_UPDATE_AUTHENTICATION_STATUS:
      return { ...state, authenticationStatus: 'succeeded' }
    default:
      return state
  }
}
