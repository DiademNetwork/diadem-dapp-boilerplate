import types from '../actions/types'
import * as R from 'ramda'

const {
  TRANSACTIONS_UPDATE_DATA,
  TRANSACTIONS_UPDATE_META
} = types

const intialState = {
  fetchStatus: 'none',
  data: [],
  meta: {
    loadedOnce: false,
    notificationCount: 0
  }
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return intialState
  }
  const mergeState = R.merge(state)
  switch (action.type) {
    case TRANSACTIONS_UPDATE_DATA: return mergeState({ data: action.data })
    case TRANSACTIONS_UPDATE_META: return mergeState({ meta: { ...state.meta, ...action.meta } })
    default:
      return state
  }
}
