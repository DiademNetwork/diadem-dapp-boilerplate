import axios from 'axios'
import * as R from 'ramda'

import mockAxios from '../mocks/axios'

export const createAPI = (fetcher, url) => {
  const getFullUrl = (path) => `${url}${path}`
  const post = async (path, data) => fetcher.post(getFullUrl(path), data)
  const postPath = path => R.partial(post, [path])
  const get = async (path) => fetcher.get(getFullUrl(path))
  const getPath = path => R.partial(get, [path])

  return Object.freeze({
    checkUser: postPath('/check'),
    checkUserAddress: postPath('/check-qtum-address'),
    confirmAchievement: postPath('/confirm'),
    createAchievement: postPath('/create'),
    depositForAchievement: postPath('/deposit'),
    encodeSupport: postPath('/encode-support'),
    encodeDeposit: postPath('/encode-deposit'),
    fetchUsers: getPath('/users'),
    registerUser: postPath('/register'),
    supportAchievement: postPath('/support'),
    updateAchievement: postPath('/create')
  })
}

if (process.env.ENV === 'sandbox') {
  mockAxios()
}

export default createAPI(axios,
  process.env.ENV === 'sandbox'
    ? ''
    : process.env.BACKEND_URL
)
