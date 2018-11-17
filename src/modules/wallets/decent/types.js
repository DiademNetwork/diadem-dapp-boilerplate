import { createAsyncTypes } from 'modules/utils'

const namespace = 'wallets/decent'

export default {
  CHECK_LAST_TX: createAsyncTypes(`${namespace}/CHECK_LAST_TX`),
  INFO_SAVED: createAsyncTypes(`${namespace}/INFO_SAVED`),
  LOAD: createAsyncTypes(`${namespace}/LOAD`),
  RECOVER: createAsyncTypes(`${namespace}/RECOVER`),
  GENERATE: createAsyncTypes(`${namespace}/GENERATE`),
  REFRESH: createAsyncTypes(`${namespace}/REFRESH`),
  WITHDRAW: createAsyncTypes(`${namespace}/WITHDRAW`)
}
