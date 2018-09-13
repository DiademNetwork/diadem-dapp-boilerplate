import axios from 'axios'

// dependencies are injected for easier testing
export const createAPI = (fetcher, url) => {
  function getUrl (path) {
    return [url, path].join('/')
  }

  async function createAchievement (data) {
    return fetcher.post(getUrl('create'), data)
  }

  async function updateAchievement (data) {
    return fetcher.post(getUrl('create'), data)
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

  async function encodeSupport (data) {
    return fetcher.post(getUrl('encode-support'), data)
  }

  async function supportAchievement (data) {
    return fetcher.post(getUrl('support'), data)
  }

  async function depositForAchievement (data) {
    return fetcher.post(getUrl('deposit'), data)
  }

  async function fetchUsers () {
    return fetcher.get(getUrl('users'))
  }

  return Object.freeze({
    checkUser,
    confirmAchievement,
    createAchievement,
    depositForAchievement,
    encodeSupport,
    fetchUsers,
    registerUser,
    supportAchievement,
    updateAchievement
  })
}

export default createAPI(axios, process.env.BACKEND_URL)
