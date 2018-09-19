import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import usersStub from '../stubs/users'

const axiosMock = new AxiosMockAdapter(axios)

axiosMock.onGet('users').reply(200, usersStub)

export default axios
