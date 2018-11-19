import { createAction, createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  fetch: createAsyncActions(T.FETCH),
  openned: createAction(T.OPENNED),
  received: createAction(T.RECEIVED),
  suscribe: createAsyncActions(T.SUSCRIBE)
}
