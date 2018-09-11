import stream from 'getstream'

export const createStreamClient = (streamTool) => {
  const client = streamTool.connect(process.env.STREAM_KEY, null, process.env.STREAM_APPID)
  const feeds = {
    achievements: client.feed(process.env.STREAM_ACHIEVEMENTS_FEED, 'common', process.env.STREAM_ACHIEVEMENTS_FEED_TOKEN),
    transactions: client.feed(process.env.STREAM_TRANSACTIONS_FEED, 'common', process.env.STREAM_TRANSACTIONS_FEED_TOKEN)
  }

  function suscribeWithCallBacks (feedName, successCallback) {
    return feeds[feedName].subscribe(successCallback).then(() => {
      console.log(`Suscribed to getstream feed: ${feedName}`)
    }, (error) => {
      console.log(error)
    })
  }

  async function fetchData (feedName, successCallback, failCallback) {
    try {
      const response = await feeds[feedName].get()
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

export default createStreamClient(stream)
