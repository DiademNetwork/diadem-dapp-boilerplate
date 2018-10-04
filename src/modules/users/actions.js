import { createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  fetch: createAsyncActions(types.FETCH)
}
