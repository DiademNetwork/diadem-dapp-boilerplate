import { createAsyncTypes } from 'modules/utils'

const namespace = 'wallets'

export default {
  CHECK_LAST_TX: createAsyncTypes(`${namespace}/CHECK_LAST_TX`),
  INFO_SAVED: `${namespace}/INFO_SAVED`,
  GET_GETSTREAM_TOKEN: createAsyncTypes(`${namespace}/GET_GETSTREAM_TOKEN`),
  LOAD: createAsyncTypes(`${namespace}/LOAD`),
  RECOVER: createAsyncTypes(`${namespace}/RECOVER`),
  GENERATE: createAsyncTypes(`${namespace}/GENERATE`),
  CHECK_REGISTRATIONS: createAsyncTypes(`${namespace}/CHECK_REGISTRATIONS`),
  CONNECT: createAsyncTypes(`${namespace}/CONNECT`),
  REFRESH: createAsyncTypes(`${namespace}/REFRESH`),
  REGISTER: createAsyncTypes(`${namespace}/REGISTER`),
  WITHDRAW: createAsyncTypes(`${namespace}/WITHDRAW`)
}
