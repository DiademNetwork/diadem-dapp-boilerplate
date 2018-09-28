import { createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  checkPendingTx: createAsyncActions(types.CHECK_PENDING_TX),
  load: createAsyncActions(types.LOAD),
  recover: createAsyncActions(types.RECOVER),
  generate: createAsyncActions(types.GENERATE),
  refresh: createAsyncActions(types.REFRESH),
  withdraw: createAsyncActions(types.WITHDRAW)
}
