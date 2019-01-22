import { createAsyncTypes } from 'modules/utils'

const namespace = 'timeline'

export default {
  FETCH: createAsyncTypes(`${namespace}/FETCH`),
  SUBSCRIBE: createAsyncTypes(`${namespace}/SUBSCRIBE`),
  RECEIVED: `${namespace}/RECEIVED`
}
