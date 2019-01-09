import axios from 'axios'
import * as R from 'ramda'

export const createStreamService = (fetcher, baseURL) => {
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
    getUserToken: postToPath(`/get-user-token`)
  })
}

export default createStreamService(axios, 'http://localhost:8080/api')
