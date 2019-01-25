import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import mockAchievements from './achievements'
import mockUsers from './users'

export default function mockAxios () {
  const axiosMock = new AxiosMockAdapter(axios)
  mockAchievements(axiosMock)
  mockUsers(axiosMock)
}
