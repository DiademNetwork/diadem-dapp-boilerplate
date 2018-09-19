import stream from 'getstream'
import streamMock from '../mocks/stream'

// dependencies are injected for easier testing /mocking
export const createStreamClient = (streamTool) => {
  const client = streamTool.connect(process.env.STREAM_KEY, null, process.env.STREAM_APPID)
  const feeds = {
    achievements: client.feed(process.env.STREAM_ACHIEVEMENTS_FEED, 'common', process.env.STREAM_ACHIEVEMENTS_FEED_TOKEN),
    transactions: client.feed(process.env.STREAM_TRANSACTIONS_FEED, 'common', process.env.STREAM_TRANSACTIONS_FEED_TOKEN)
  }

  async function suscribeWithCallBacks (feedName, successCallback) {
    try {
      await feeds[feedName].subscribe(successCallback)
      console.log(`Suscribed to getstream feed: ${feedName}`)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchData (feedName, successCallback, failCallback) {
    try {
      const response = await feeds[feedName].get({ limit: 100 })
      return successCallback(response.results)
    } catch (error) {
      failCallback(error)
      return []
    }
  }

  return Object.freeze({
    fetchData,
    suscribeWithCallBacks
  })
}

export default createStreamClient(process.env.ENV === 'sandbox'
  ? streamMock
  : stream
)
