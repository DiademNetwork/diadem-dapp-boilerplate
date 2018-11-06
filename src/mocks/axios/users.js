// TODO: use query params to mock different response

import usersStub from 'stubs/users'
import {
  registeredUser,
  nonRegisteredUser,
  pendingRegistrationUser
} from 'stubs/facebook'

export default (axiosMock) => {
  axiosMock.onGet('/users').reply(200, usersStub)
  axiosMock.onPost('/check', { user: registeredUser.userID }).reply(200, { exists: true, pending: false })
  axiosMock.onPost('/check', { user: nonRegisteredUser.userID }).reply(200, { exists: false, pending: false })
  axiosMock.onPost('/check', { user: pendingRegistrationUser.userID }).reply(200, { exists: false, pending: true })
  axiosMock.onPost('/check-qtum-address').reply(200, { ok: true })
  axiosMock.onPost('/register').reply(200, { ok: true })
  return axiosMock
}
