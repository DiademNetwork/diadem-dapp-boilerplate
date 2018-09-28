
import { createAsyncTypes } from 'modules/utils'

const namespace = 'facebook/registration'

export default {
  CHECK: createAsyncTypes(`${namespace}/CHECK`),
  REGISTER: createAsyncTypes(`${namespace}/REGISTER`)
}
