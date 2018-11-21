import usersStub from 'stubs/users'
import mocksController from 'mocks/controller'

export default (axiosMock) => {
  axiosMock.onGet('/users').reply(200, usersStub)
  axiosMock.onPost('/check').reply(function () {
    const { isUserRegistered, isUserPendingRegistration } = mocksController.get()
    return [200, {
      exists: isUserRegistered,
      pending: isUserPendingRegistration
    }]
  })
  axiosMock.onPost('/check-qtum-address').reply(200, { ok: true })
  axiosMock.onPost('/register').reply(200, { ok: true })
  return axiosMock
}
