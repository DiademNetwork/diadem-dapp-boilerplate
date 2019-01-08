import mocksController from 'mocks/controller'
import { createMockResponse } from './utils'

export default (axiosMock) => {
  axiosMock.onGet(/^\/insight-api\/tx.*/g).reply(createMockResponse(function () {
    const confirmations = mocksController.get().pendingTxID === '' ? 1 : 0
    return [200, { confirmations }]
  }))
  return axiosMock
}
