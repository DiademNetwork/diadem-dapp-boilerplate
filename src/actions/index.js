import axios from 'axios'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import stream from 'getstream'
import notifications from '../notifications'
import types from './types'
const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ASYNC_STREAM_FETCH_ACHIEVEMENTS,
  ASYNC_STREAM_FETCH_USER_TRANSACTIONS,
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS,
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} = types

const network = networks.testnet
const client = stream.connect(process.env.STREAM_KEY, null, process.env.STREAM_APPID)

// Facebook
export const updateFacebook = (data) => ({ type: FACEBOOK_UPDATE_DATA, data })
export const updateFacebookAuthenticationStatus = (status) => ({ type: FACEBOOK_UPDATE_AUTHENTICATION_STATUS, status })

// Wallet
export const updateWallet = (data) => ({ type: WALLET_UPDATE_DATA, data })
export const updateWalletMeta = (meta) => ({ type: WALLET_UPDATE_META, meta })
export const updateWalletStatus = (status) => ({ type: WALLET_UPDATE_STATUS, status })

export const refreshWallet = (wallet) => async dispatch => {
  const walletData = await wallet.getInfo()
  dispatch(updateWallet(walletData))
}

export const recoverWallet = (mnemonic) => async dispatch => {
  const wallet = network.fromMnemonic(mnemonic)
  const privateKey = wallet.toWIF()
  window.localStorage.setItem('privateKey', privateKey)
  const walletData = await wallet.getInfo()
  dispatch(updateWallet(walletData))
  dispatch(updateWalletMeta({ wallet }))
  dispatch(updateWalletStatus('restored'))
}

// Authentication and Wallet Generation/Restore
export const handleFacebookLogin = (facebookData) => async dispatch => {
  dispatch(updateFacebook(facebookData))
  dispatch(updateFacebookAuthenticationStatus('suceeded'))
  dispatch(notifications.facebookLoginSuccess)
  const { accessToken, userID } = facebookData
  try {
    const { exists } = await axios.post(`${process.env.BACKEND_URL}/check`, { user: userID })
    if (!exists) {
      const mnemonic = generateMnemonic()
      const wallet = network.fromMnemonic(mnemonic)
      const privateKey = wallet.toWIF()
      window.localStorage.setItem('privateKey', privateKey)
      dispatch(updateWalletMeta({ mnemonic, privateKey }))
      const walletData = await wallet.getInfo()
      await axios.post(`${process.env.BACKEND_URL}/register`, {
        address: walletData.addrStr,
        user: userID,
        token: accessToken
      })
      dispatch(updateWalletMeta({ wallet }))
      dispatch(updateWallet(walletData))
      dispatch(updateWalletStatus('generated'))
    } else {
      const storedPrivateKey = window.localStorage.getItem('privateKey')
      if (!storedPrivateKey) {
        dispatch(updateWalletStatus('needs-recovering'))
      } else {
        const wallet = network.fromWIF(storedPrivateKey)
        dispatch(updateWalletMeta({ wallet }))
        await refreshWallet(wallet)(dispatch)
        dispatch(updateWalletStatus('restored'))
      }
    }
  } catch (error) {
    dispatch(updateWalletStatus('error'))
  }
}

export const fetchAchievements = () => async dispatch => {
  try {
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.requested })
    const response = await client.feed(process.env.STREAM_ACHIEVEMENTS_FEED, 'common', process.env.STREAM_FEED_TOKEN).get()
    const data = response.results
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.succeeded, data })
  } catch (error) {
    console.log({ error })
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.failed, payload: { error } })
  }
}

export const fetchUserTransactions = (userID) => async dispatch => {
  try {
    dispatch({ type: ASYNC_STREAM_FETCH_USER_TRANSACTIONS.requested })
    const response = await client.feed(process.env.STREAM_TRANSACTIONS_FEED, userID, process.env.STREAM_FEED_TOKEN).get()
    const userTransactions = response.results
    dispatch({ type: ASYNC_STREAM_FETCH_USER_TRANSACTIONS.succeeded, payload: { userTransactions } })
  } catch (error) {
    dispatch({ type: ASYNC_STREAM_FETCH_USER_TRANSACTIONS.failed, payload: { error } })
  }
}

export const confirmAchievement = ({ token, user, target }) => async dispatch => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.requested })
    await axios.post(`${process.env.BACKEND_URL}/confirm`, { token, user, target })
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.succeeded })
  } catch (error) {
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.failed, payload: { error } })
  }
}

export const supportAchievement = (payload) => async dispatch => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.requested })
    const { wallet, author, amount } = payload
    await wallet.send(author, amount * 1e8, { feeRate: Math.ceil(0.004 * 1e8 / 100) })
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.succeeded })
  } catch (error) {
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.failed, payload: { error } })
  }
}
