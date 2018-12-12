import usersStub from 'stubs/users'
import mocksController from 'mocks/controller'
import { createMockResponse } from './utils'

const getBlockchainKey = config => config.url.split('/')[1]

export default (axiosMock) => {
  axiosMock.onGet('/users').reply(createMockResponse(200, usersStub))
  axiosMock.onPost(/^\/.+\/(check)$/).reply(createMockResponse((config) => {
    const { [getBlockchainKey(config)]: { isRegistered, isPendingRegistration } } = mocksController.get()
    return [200, {
      exists: isRegistered,
      pending: isPendingRegistration
    }]
  }))
  axiosMock.onPost(/^\/.+\/(check-address)$/).reply(createMockResponse((config) => {
    const { [getBlockchainKey(config)]: { isAddressMatchingTheOneRegistered: ok } } = mocksController.get()
    return [200, { ok }]
  }))
  axiosMock.onPost(/^\/.+\/(register)$/).reply(createMockResponse((config) => {
    const { [getBlockchainKey(config)]: { isRegistrationSuccess: ok } } = mocksController.get()
    return [200, { ok }]
  }))
}
