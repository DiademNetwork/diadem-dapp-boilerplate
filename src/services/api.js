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

  return Object.freeze({
    // blockchain-specific calls
    checkRegistration: (chain) => postToPath(`/${chain}/check`),
    createAchievement: (chain) => postToPath(`/${chain}/create`),
    prepareSupport: (chain) => postToPath(`/${chain}/prepare-support`),
    registerUser: (chain) => postToPath(`/${chain}/register`),
    supportAchievement: (chain) => postToPath(`/${chain}/support`),
    // non-blockchain-specific calls
    confirmAchievement: postToPath('/confirm'),
    getUserToken: postToPath('/get-user-token')
  })
}

if (process.env.NODE_ENV === 'sandbox') {
  mockAxios()
}

export default createAPI(axios, process.env.BACKEND_URL)
