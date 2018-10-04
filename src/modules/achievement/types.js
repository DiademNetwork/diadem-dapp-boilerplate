import { createAsyncTypes } from 'modules/utils'

const namespace = 'achievements/achievement'

export default {
  CONFIRM: createAsyncTypes(`${namespace}/CONFIRM`),
  CREATE: createAsyncTypes(`${namespace}/CREATE`),
  DEPOSIT: createAsyncTypes(`${namespace}/DEPOSIT`),
  SUPPORT: createAsyncTypes(`${namespace}/SUPPORT`),
  UPDATE: createAsyncTypes(`${namespace}/UPDATE`)
}
