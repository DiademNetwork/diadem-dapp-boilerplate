import mocksConfig from 'mocks/config'

export default (axiosMock) => {
  axiosMock.onGet(/^\/insight-api\/tx.*/g).reply(function () {
    const confirmations = mocksConfig.get().pendingTxID === '' ? 1 : 0
    return [200, { confirmations }]
  })
  return axiosMock
}
