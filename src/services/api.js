import axios from 'axios'

// dependencies are injected for easier testing
export const createAPI = (fetcher, url) => {
  function getUrl (path) {
    return [url, path].join('/')
  }

  async function createAchievement (data) {
    return fetcher.post(getUrl('create-achievement'), data)
  }

  async function checkUser (data) {
    return fetcher.post(getUrl('check'), data)
  }

  async function registerUser (data) {
    return fetcher.post(getUrl('register'), data)
  }

  async function confirmAchievement (data) {
    return fetcher.post(getUrl('confirm'), data)
  }

  return Object.freeze({
    checkUser,
    confirmAchievement,
    createAchievement,
    registerUser
  })
}

export default createAPI(axios, process.env.BACKEND_URL)
