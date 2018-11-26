import { createAction, createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  checkLastTx: createAsyncActions(T.CHECK_LAST_TX),
  checkRegistration: createAsyncActions(T.CHECK_REGISTRATION),
  infoSaved: createAction(T.INFO_SAVED),
  load: createAsyncActions(T.LOAD),
  recover: createAsyncActions(T.RECOVER),
  generate: createAsyncActions(T.GENERATE),
  refresh: createAsyncActions(T.REFRESH),
  register: createAsyncActions(T.REGISTER),
  withdraw: createAsyncActions(T.WITHDRAW)
}
