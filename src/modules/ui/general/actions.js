import { createAction } from 'modules/utils'
import types from './types'

export default {
  toggleHelp: createAction(types.TOGGLE_HELP)
}
