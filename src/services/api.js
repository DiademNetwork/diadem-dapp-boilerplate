import axios from 'axios'
import axiosMock from '../mocks/axios'

// dependencies are injected for easier testing /mocking
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

  async function checkUserAddress (data) {
    return fetcher.post(getUrl('check-qtum-address'), data)
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

  async function encodeDeposit (data) {
    return fetcher.post(getUrl('encode-deposit'), data)
  }

  async function supportAchievement (data) {
    return fetcher.post(getUrl('support'), data)
  }

  async function depositForAchievement (data) {
    return fetcher.post(getUrl('deposit'), data)
  }

  async function fetchUsers () {
    console.log(getUrl('users'))
    return fetcher.get(getUrl('users'))
  }

  return Object.freeze({
    checkUser,
    checkUserAddress,
    confirmAchievement,
    createAchievement,
    depositForAchievement,
    encodeSupport,
    encodeDeposit,
    fetchUsers,
    registerUser,
    supportAchievement,
    updateAchievement
  })
}

export default createAPI(
  process.env.ENV === 'development'
    ? axiosMock
    : axios
  ,
  process.env.ENV === 'development'
    ? ''
    : process.env.BACKEND_URL
)
