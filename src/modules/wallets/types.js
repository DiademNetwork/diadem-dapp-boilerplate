import { createAsyncTypes } from 'modules/utils'

const namespace = 'wallets'

export default {
  CHECK_LAST_TX: createAsyncTypes(`${namespace}/CHECK_LAST_TX`),
  INFO_SAVED: `${namespace}/INFO_SAVED`,
  LOAD: createAsyncTypes(`${namespace}/LOAD`),
  RECOVER: createAsyncTypes(`${namespace}/RECOVER`),
  GENERATE: createAsyncTypes(`${namespace}/GENERATE`),
  REFRESH: createAsyncTypes(`${namespace}/REFRESH`),
  CHECK_REGISTRATIONS: createAsyncTypes(`${namespace}/CHECK_REGISTRATIONS`),
  CONNECT: createAsyncTypes(`${namespace}/CONNECT`),
  REGISTER: createAsyncTypes(`${namespace}/REGISTER`),
  WITHDRAW: createAsyncTypes(`${namespace}/WITHDRAW`)
}
