import mocksController from 'mocks/controller'

export default (axiosMock) => {
  axiosMock.onGet(/^\/insight-api\/tx.*/g).reply(function () {
    const confirmations = mocksController.get().pendingTxID === '' ? 1 : 0
    return [200, { confirmations }]
  })
  return axiosMock
}
