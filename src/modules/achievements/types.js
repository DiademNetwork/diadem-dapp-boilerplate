import { createAsyncTypes } from 'modules/utils'

const namespace = 'achievements'

export default {
  CONFIRM: createAsyncTypes(`${namespace}/CONFIRM`),
  CREATE: createAsyncTypes(`${namespace}/CREATE`),
  FETCH: createAsyncTypes(`${namespace}/FETCH`),
  FETCH_USER: createAsyncTypes(`${namespace}/FETCH_USER`),
  RECEIVED: `${namespace}/RECEIVED`,
  RECEIVED_USER: `${namespace}/RECEIVED_USER`,
  SUPPORT: createAsyncTypes(`${namespace}/SUPPORT`),
  SUBSCRIBE: createAsyncTypes(`${namespace}/SUBSCRIBE`)
}
