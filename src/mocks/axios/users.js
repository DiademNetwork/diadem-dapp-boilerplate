import usersStub from 'stubs/users'
import mocksConfig from 'mocks/config'

export default (axiosMock) => {
  axiosMock.onGet('/userso').reply(200, usersStub)
  axiosMock.onPost('/check').reply(function () {
    const { isUserRegistered, isUserPendingRegistration } = mocksConfig.get()
    return [200, {
      exists: isUserRegistered,
      pending: isUserPendingRegistration
    }]
  })
  axiosMock.onPost('/check-qtum-address').reply(200, { ok: true })
  axiosMock.onPost('/register').reply(200, { ok: true })
  return axiosMock
}
