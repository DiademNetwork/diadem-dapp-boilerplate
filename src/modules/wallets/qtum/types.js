import { createAsyncTypes } from 'modules/utils'

const namespace = 'wallets/qtum'

export default {
  CHECK_PENDING_TX: createAsyncTypes(`${namespace}/CHECK_PENDING_TX`),
  LOAD: createAsyncTypes(`${namespace}/LOAD`),
  RECOVER: createAsyncTypes(`${namespace}/RECOVER`),
  GENERATE: createAsyncTypes(`${namespace}/GENERATE`),
  REFRESH: createAsyncTypes(`${namespace}/REFRESH`),
  WITHDRAW: createAsyncTypes(`${namespace}/WITHDRAW`)
}
