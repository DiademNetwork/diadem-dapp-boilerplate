import { createAction, createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  checkLastTx: createAsyncActions(T.CHECK_LAST_TX),
  infoSaved: createAction(T.INFO_SAVED),
  load: createAsyncActions(T.LOAD),
  recover: createAsyncActions(T.RECOVER),
  generate: createAsyncActions(T.GENERATE),
  refresh: createAsyncActions(T.REFRESH),
  withdraw: createAsyncActions(T.WITHDRAW)
}
