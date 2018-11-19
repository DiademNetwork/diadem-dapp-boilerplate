import { createAsyncTypes } from 'modules/utils'

const namespace = 'achievements'

export default {
  FETCH: createAsyncTypes(`${namespace}/FETCH`),
  OPENNED: `${namespace}/OPENNED`,
  SUSCRIBE: createAsyncTypes(`${namespace}/SUSCRIBE`),
  RECEIVED: `${namespace}/RECEIVED`
}
