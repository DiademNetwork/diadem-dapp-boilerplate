import { createAsyncTypes } from 'modules/utils'

const namespace = 'timeline'

export default {
  FETCH: createAsyncTypes(`${namespace}/FETCH`),
  SUSCRIBE: createAsyncTypes(`${namespace}/SUSCRIBE`),
  RECEIVED: `${namespace}/RECEIVED`
}
