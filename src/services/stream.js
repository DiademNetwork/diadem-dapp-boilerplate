
import stream from 'getstream'
// import streamMock from 'mocks/stream'
import axios from 'axios'
import * as R from 'ramda'

const LIMIT = 100
const APP_KEY = 'bf5kra2xwhbs'
const APP_ID = '46377'

export const createStreamClient = (fetcher, baseURL, streamTool) => {
  const getFullUrl = (path) => `${baseURL}${path}`

  const post = async (path, requestData) => {
    const { data: responseData } = await fetcher.post(getFullUrl(path), requestData)
    return responseData
  }
  const postToPath = path => R.partial(post, [path])

  const client = streamTool.connect(APP_KEY, null, APP_ID)

  const userClient = (function () {
    let userClient = null
    const get = () => userClient
    const init = () => { userClient = streamTool.connect(APP_KEY, userToken.get(), APP_ID) }
    return Object.freeze({ get, init })
  })()

  const userToken = (function () {
    let userToken = null
    const get = () => userToken
    const set = token => { userToken = token }
    return Object.freeze({ get, set })
  })()

  // Feeds clients encapsulated
  const feeds = (function () {
    const data = {
      achievement_aggregated: {
        common: client.feed('achievement_aggregated', 'common', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6IioiLCJhY3Rpb24iOiJyZWFkIiwiZmVlZF9pZCI6ImFjaGlldmVtZW50X2FnZ3JlZ2F0ZWRjb21tb24ifQ.8YZXCTBLlKCoMr-D56gU-tDjbdlNpOISXf--3Ew-mWQ')
      },
      timeline: {}
    }

    const get = (feedName, group) => {
      if (data[feedName][group]) {
        return data[feedName][group]
      }
      const token = userToken.get()
      if (!token) {
        throw new Error('userToken is not available')
      }
      const feed = client.feed(feedName, group, token)
      data[feedName][group] = feed
      return feed
    }

    return Object.freeze({ get })
  })()

  async function suscribeWithCallBacks (feedName, group, successCallback) {
    try {
      await feeds.get(feedName, group).subscribe(successCallback)
      console.log(`Suscribed to getstream feed ${feedName}:${group}`)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchData (feedName, group, page = 1) {
    const { results, next } = await feeds.get(feedName, group).get({
      limit: LIMIT,
      offset: LIMIT * (page - 1)
    })
    console.log(`Fetch succeeded for ${feedName}:${group}`, results)
    return { results, hasMore: next !== '' }
  }

  async function setUser ({ data, userAddress }) {
    const client = userClient.get()
    try {
      await client.user(userAddress).update(data)
    } catch (error) {
      await client.setUser(data)
    }
  }

  return Object.freeze({
    fetchData,
    userToken,
    suscribeWithCallBacks,
    createAchievement: postToPath(`/achievements/create`),
    confirmAchievement: postToPath(`/achievements/confirm`),
    getUserToken: postToPath(`/get-user-token`),
    setUser,
    supportAchievement: postToPath(`/achievements/support`),
    userClient
  })
}

export default createStreamClient(
  axios,
  'http://localhost:8080/api',
  process.env.ENV === 'sandbox'
    ? stream
    : stream
)
