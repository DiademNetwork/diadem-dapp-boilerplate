import { createAction, createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  checkLastTx: createAsyncActions(T.CHECK_LAST_TX),
  checkRegistrations: createAsyncActions(T.CHECK_REGISTRATIONS),
  infoSaved: createAction(T.INFO_SAVED),
  load: createAsyncActions(T.LOAD),
  recover: createAsyncActions(T.RECOVER),
  generate: createAsyncActions(T.GENERATE),
  connect: createAsyncActions(T.CONNECT),
  register: createAsyncActions(T.REGISTER),
  refresh: createAsyncActions(T.REFRESH),
  withdraw: createAsyncActions(T.WITHDRAW),
  getGetstreamToken: createAsyncActions(T.GET_GETSTREAM_TOKEN)
}
