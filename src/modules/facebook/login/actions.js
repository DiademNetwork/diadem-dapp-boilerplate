import { createAction } from 'modules/utils'
import types from './types'

export default {
  logged: createAction(types.LOGGED)
}
