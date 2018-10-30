import { createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  fetch: createAsyncActions(T.FETCH)
}
