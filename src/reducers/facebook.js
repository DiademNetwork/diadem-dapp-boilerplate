import merge from './merge-state'
import T from '../actions/types'

export default (state, { type, data }) => {
  if (typeof state === 'undefined') {
    return {
      authenticationStatus: 'none',
      data: {}
    }
  }
  switch (type) {
    case T.FACEBOOK_UPDATE_DATA: return merge(state)({ data })
    case T.FACEBOOK_UPDATE_AUTHENTICATION_STATUS: return merge(state)({ authenticationStatus: 'succeeded' })
    default: return state
  }
}
