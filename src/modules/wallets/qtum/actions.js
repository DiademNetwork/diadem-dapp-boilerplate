import { createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  checkLastTx: createAsyncActions(types.CHECK_LAST_TX),
  infoSaved: createAsyncActions(types.INFO_SAVED),
  load: createAsyncActions(types.LOAD),
  recover: createAsyncActions(types.RECOVER),
  generate: createAsyncActions(types.GENERATE),
  refresh: createAsyncActions(types.REFRESH),
  withdraw: createAsyncActions(types.WITHDRAW)
}
