export default (axiosMock) => {
  axiosMock.onPost('/confirm').reply(200)
  axiosMock.onPost('/create').reply(200)
  axiosMock.onPost('/deposit').reply(200)
  axiosMock.onPost('/support').reply(200)
  axiosMock.onPost('/encode-deposit').reply(200, { address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
  axiosMock.onPost('/encode-support').reply(200, { address: 'QetMQCLKHswMsU3NZg9MtWR3R9r9479CAT', encodedData: '68656c6c6f7720776f726c64' })
  return axiosMock
}
