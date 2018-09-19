import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import mockUsers from './users'
import mockAchievements from './achievements'

export default function mockAxios () {
  const axiosMock = new AxiosMockAdapter(axios)
  mockUsers(axiosMock)
  mockAchievements(axiosMock)
}
