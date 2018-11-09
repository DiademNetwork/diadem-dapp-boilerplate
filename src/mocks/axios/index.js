import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import mockAchievements from './achievements'
import mockInsight from './insight'
import mockUsers from './users'

export default function mockAxios () {
  const axiosMock = new AxiosMockAdapter(axios)
  mockAchievements(axiosMock)
  mockInsight(axiosMock)
  mockUsers(axiosMock)
}
