// TODO: use query params to mock different response

import usersStub from '../../stubs/users'

export default (axiosMock) => {
  axiosMock.onGet('/users').reply(200, usersStub)
  axiosMock.onPost('/check', { user: '10156583216029650' }).reply(200, { exists: true, pending: false })
  axiosMock.onPost('/check').reply(200, { exists: false, pending: true })
  axiosMock.onPost('/check-qtum-address').reply(200, { ok: true })
  return axiosMock
}
