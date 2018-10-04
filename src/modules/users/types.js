import { createAsyncTypes } from 'modules/utils'

const namespace = 'users'

export default {
  FETCH: createAsyncTypes(`${namespace}/FETCH`)
}
