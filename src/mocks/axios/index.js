import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import handleUsers from './users'

export default function mockAxios () {
  const axiosMock = new AxiosMockAdapter(axios)
  handleUsers(axiosMock)
}
