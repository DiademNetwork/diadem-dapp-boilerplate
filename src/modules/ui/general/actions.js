import { createAction } from 'modules/utils'
import T from './types'

export default {
  toggleHelp: createAction(T.TOGGLE_HELP)
}
