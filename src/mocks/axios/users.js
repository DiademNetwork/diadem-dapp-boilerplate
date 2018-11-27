import usersStub from 'stubs/users'
import mocksController from 'mocks/controller'
import { createMockResponse } from './utils'

export default (axiosMock) => {
  axiosMock.onGet('/users').reply(createMockResponse(200, usersStub))
  axiosMock.onPost(/^\/.+\/check/).reply(createMockResponse(() => {
    const { isUserRegistered, isUserPendingRegistration } = mocksController.get()
    return [200, {
      exists: isUserRegistered,
      pending: isUserPendingRegistration
    }]
  }))
  axiosMock.onPost('/check-qtum-address').reply(createMockResponse(200, { ok: true }))
  axiosMock.onPost('/register').reply(createMockResponse(200, { ok: true }))
  return axiosMock
}
