
import { createAsyncTypes } from 'modules/utils'
import network from 'configurables/network'

const namespace = `${network.name}/registration`

export default {
  CHECK: createAsyncTypes(`${namespace}/CHECK`),
  REGISTER: createAsyncTypes(`${namespace}/REGISTER`)
}
