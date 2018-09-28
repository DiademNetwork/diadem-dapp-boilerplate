import { createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  check: createAsyncActions(types.CHECK),
  register: createAsyncActions(types.REGISTER)
}
