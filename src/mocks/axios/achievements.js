import { createMockResponse } from './utils'

export default (axiosMock) => {
  axiosMock.onPost('/confirm').reply(createMockResponse(200))
  axiosMock.onPost(/^\/.+\/(create)$/).reply(createMockResponse(200))
  axiosMock.onPost(/^\/.+\/(support)$/).reply(createMockResponse(200))
  axiosMock.onPost(/^\/.+\/(encode-support)$/).reply(createMockResponse(200, { address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' }))
  return axiosMock
}
