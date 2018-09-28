import { createAction, createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  fetch: createAsyncActions(types.FETCH),
  received: createAction(types.RECEIVED),
  suscribe: createAsyncActions(types.SUSCRIBE)
}
