import axios from 'axios'
import * as R from 'ramda'

import mockAxios from '../mocks/axios'

export const createAPI = (fetcher, url) => {
  const getFullUrl = (path) => `${url}${path}`
  const post = async (path, data) => {
    const { data: responseData } = await fetcher.post(getFullUrl(path), data)
    return responseData
  }
  const postPath = path => R.partial(post, [path])
  const get = async (path) => {
    const { data } = await fetcher.get(getFullUrl(path))
    return data
  }
  const getPath = path => R.partial(get, [path])

  return Object.freeze({
    checkFacebookRegistration: postPath('/check'),
    checkQTUMAddressMatchesFacebookUser: postPath('/check-address'),
    confirmAchievement: postPath('/confirm'),
    createUpdateAchievement: postPath('/create'),
    depositForAchievement: postPath('/deposit'),
    encodeSupport: postPath('/encode-support'),
    encodeDeposit: postPath('/encode-deposit'),
    fetchUsers: getPath('/users'),
    registerUser: postPath('/register'),
    supportAchievement: postPath('/support')
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
