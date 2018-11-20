import { createAction } from 'modules/utils'
import T from './types'

export default {
  logged: createAction(T.LOGGED)
}
