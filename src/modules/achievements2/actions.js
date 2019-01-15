import { createAction, createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  confirm: createAsyncActions(T.CONFIRM),
  support: createAsyncActions(T.SUPPORT),
  create: createAsyncActions(T.CREATE),
  fetch: createAsyncActions(T.FETCH),
  fetchUser: createAsyncActions(T.FETCH_USER),
  received: createAction(T.RECEIVED),
  receivedUser: createAction(T.RECEIVED_USER),
  suscribe: createAsyncActions(T.SUSCRIBE)
}
