import { createAsyncTypes } from 'modules/utils'

const namespace = 'transactions'

export default {
  FETCH: createAsyncTypes(`${namespace}/FETCH`),
  SUSCRIBE: createAsyncTypes(`${namespace}/SUSCRIBE`),
  RECEIVED: `${namespace}/RECEIVED`
}
