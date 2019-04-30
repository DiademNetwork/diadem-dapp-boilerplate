import { merge } from 'modules/utils'
import * as R from 'ramda'
import T from './types'

const initialState = {
  createStatus: 'none',
  fetchStatus: 'none',
  list: {
    hasMore: false,
    list: []
  },
  userList: {
    hasMore: false,
    list: []
  }
}

export default function createReducer (state, {
  hasMore,
  list,
  type
}) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.FETCH.requested: return merge()(state)({ fetchStatus: 'requested' })
    case T.FETCH.succeeded: return merge()(state)({ list: { list, hasMore }, fetchStatus: 'succeeded' })
    case T.FETCH_USER.requested: return merge()(state)({ fetchStatus: 'requested' })
    case T.FETCH_USER.succeeded: return merge({ uniqBy: R.prop('group') })(state)({ userList: { list, hasMore }, fetchStatus: 'succeeded' })
    case T.CREATE.succeeded: return merge()(state)({ createStatus: 'succeeded' })
    default: return state
  }
}
