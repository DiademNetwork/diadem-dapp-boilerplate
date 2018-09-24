
import stream from 'getstream'
import streamMock from '../mocks/stream'

const LIMIT = 100
const TRANSACTIONS_LIMIT = 30

// dependencies are injected for easier testing /mocking
export const createStreamClient = (streamTool) => {
  const client = streamTool.connect(process.env.STREAM_KEY, null, process.env.STREAM_APPID)

  const feeds = {
    achievements: client.feed(
      process.env.STREAM_ACHIEVEMENTS_FEED,
      'common',
      process.env.STREAM_ACHIEVEMENTS_FEED_TOKEN
    ),
    transactions: client.feed(
      process.env.STREAM_TRANSACTIONS_FEED,
      'common',
      process.env.STREAM_TRANSACTIONS_FEED_TOKEN
    )
  }

  async function suscribeWithCallBacks (feedName, successCallback) {
    try {
      await feeds[feedName].subscribe(successCallback)
      console.log(`Suscribed to getstream feed: ${feedName}`)
    } catch (error) {
      console.log(error)
    }
  }

  // For now, all data is fetched. Later, when filters will be implemented
  // idea will be to fetch only the LIMIT first results of search, and have a system of pagination/scroll load
  // while loop is temporary while data amount is low, and filters/search on their way to be implemented
  // Imperative code below is thus temporary
  async function fetchData (feedName, successCallback, failCallback, page) {
    if (feedName === 'transactions') {
      const { results, next } = await feeds[feedName].get({
        limit: TRANSACTIONS_LIMIT,
        offset: TRANSACTIONS_LIMIT * (page - 1)
      })
      return successCallback({ results, hasMore: next !== '' })
    }
    try {
      let items
      const { next, results } = await feeds[feedName].get({ limit: LIMIT })
      items = results
      let allFetched = next === ''
      if (!allFetched) {
        let previousRequestsCount = 1
        while (!allFetched) {
          const { results: newResults, next: newNext } = await feeds[feedName].get({
            limit: LIMIT,
            offset: LIMIT * previousRequestsCount
          })
          previousRequestsCount += 1
          allFetched = newNext === ''
          items = [ ...items, ...newResults ]
        }
      }
      return successCallback({ results: items })
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

export default createStreamClient(
  process.env.ENV === 'sandbox'
    ? streamMock
    : stream
)
