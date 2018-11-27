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
    // blockchain-specific calls
    checkRegistration: (chain) => postToPath(`/${chain}/check`),
    checkQTUMAddressMatchesRegisteredUser: (chain) => postToPath(`/${chain}/check-address`),
    createUpdateAchievement: (chain) => postToPath(`/${chain}/create`),
    depositForAchievement: (chain) => postToPath(`/${chain}/deposit`),
    encodeSupport: (chain) => postToPath(`/${chain}/encode-support`),
    encodeDeposit: (chain) => postToPath(`/${chain}/encode-deposit`),
    fetchUsers: (chain) => getFromPath(`/${chain}/users`),
    registerUser: (chain) => postToPath(`/${chain}/register`),
    supportAchievement: (chain) => postToPath(`/${chain}/support`),
    // non-blockchain-specific calls
    confirmAchievement: postToPath('/confirm')
  })
}

if (process.env.ENV === 'sandbox') {
  mockAxios()
}

export default createAPI(axios, process.env.BACKEND_URL)
