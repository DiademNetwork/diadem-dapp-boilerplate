import axios from 'axios'
import * as R from 'ramda'

import mockAxios from 'mocks/axios'

export const createAPI = (fetcher, baseURL) => {
  const getFullUrl = (path) => `${baseURL}${path}`

  const post = async (path, requestData) => {
    const { data: responseData } = await fetcher.post(getFullUrl(path), requestData)
    return responseData
  }
  const postToPath = path => R.partial(post, [path])

  const get = async (path) => {
    const { data: responseData } = await fetcher.get(getFullUrl(path))
    return responseData
  }
  const getFromPath = path => R.partial(get, [path])

  return Object.freeze({
    checkFacebookRegistration: postToPath('/check'),
    checkQTUMAddressMatchesFacebookUser: postToPath('/check-qtum-address'),
    confirmAchievement: postToPath('/confirm'),
    createUpdateAchievement: postToPath('/create'),
    depositForAchievement: postToPath('/deposit'),
    encodeSupport: postToPath('/encode-support'),
    encodeDeposit: postToPath('/encode-deposit'),
    fetchUsers: getFromPath('/users'),
    registerUser: postToPath('/register'),
    supportAchievement: postToPath('/support')
  })
}

if (process.env.ENV === 'sandbox') {
  mockAxios()
}

export default createAPI(axios, process.env.BACKEND_URL)
