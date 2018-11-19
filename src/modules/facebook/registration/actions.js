import { createAsyncActions } from 'modules/utils'
import T from './types'

export default {
  check: createAsyncActions(T.CHECK),
  register: createAsyncActions(T.REGISTER)
}
