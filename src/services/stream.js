
import stream from 'getstream'
import streamMock from 'mocks/stream'

const LIMIT = 100
const GETSTREAM_APP_KEY = process.env.GETSTREAM_APP_KEY
const GETSTREAM_APP_ID = process.env.GETSTREAM_APP_ID
const GETSTREAM_ACHIEVEMENT_COMMON_TOKEN = process.env.GETSTREAM_ACHIEVEMENT_COMMON_TOKEN

export const createStreamClient = (streamTool) => {
  const client = streamTool.connect(GETSTREAM_APP_KEY, null, GETSTREAM_APP_ID)

  const userClient = (function () {
    let userClient = null
    const get = () => userClient
    const init = () => { userClient = streamTool.connect(GETSTREAM_APP_KEY, userToken.get(), GETSTREAM_APP_ID) }
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
        common: client.feed('achievement_aggregated', 'common', GETSTREAM_ACHIEVEMENT_COMMON_TOKEN)
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

  async function subscribeWithCallBacks (feedName, group, successCallback) {
    try {
      await feeds.get(feedName, group).subscribe(successCallback)
    } catch (error) {
      throw new Error(`Subscribed to getstream feed ${feedName}:${group}`)
    }
  }

  async function fetchData (feedName, group, page = 1) {
    const { results, next } = await feeds.get(feedName, group).get({
      limit: LIMIT,
      offset: LIMIT * (page - 1)
    })
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
    subscribeWithCallBacks,
    setUser,
    userClient
  })
}

export default createStreamClient(
  process.env.ENV === 'sandbox'
    ? streamMock
    : stream
)
