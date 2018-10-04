import { createAsyncActions } from 'modules/utils'
import types from './types'

export default {
  confirm: createAsyncActions(types.CONFIRM),
  create: createAsyncActions(types.CREATE),
  deposit: createAsyncActions(types.DEPOSIT),
  support: createAsyncActions(types.SUPPORT),
  update: createAsyncActions(types.UPDATE)
}
