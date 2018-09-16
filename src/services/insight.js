import axios from 'axios'

// dependencies are injected for easier testing
export const createInsight = (fetcher, url) => {
  function getUrl (path) {
    return [url, path].join('/')
  }

  async function checkTransactions (path) {
    return fetcher.get(getUrl(path))
  }

  return Object.freeze({
    checkTransactions
  })
}

export default createInsight(axios, process.env.QTUM_INSIGHT_URL)
