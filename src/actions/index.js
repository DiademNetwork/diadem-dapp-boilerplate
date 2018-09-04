import axios from 'axios'
import { networks, generateMnemonic } from 'qtumjs-wallet'

import {
  ACHIEVEMENT_CONFIRM_REQUESTED,
  ACHIEVEMENT_CONFIRM_SUCCEEDED,
  ACHIEVEMENT_CONFIRM_FAILED,
  STREAM_FETCH_ACHIEVEMENTS_REQUESTED,
  STREAM_FETCH_ACHIEVEMENTS_SUCCEEDED,
  STREAM_FETCH_ACHIEVEMENTS_FAILED,
  SUPPORT_SEND_REQUESTED,
  SUPPORT_SEND_SUCCEEDED,
  SUPPORT_SEND_FAILED,
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS,
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} from './types'

const network = networks.testnet

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
  try {
    dispatch(updateFacebook(facebookData))
    dispatch(updateFacebookAuthenticationStatus('suceeded'))
    const { userID } = facebookData
    const isUserRegistered = await axios.post(`${process.env.BACKEND_URL}/check`, { user: userID })
    if (!isUserRegistered) {
      const mnemonic = generateMnemonic()
      const wallet = network.fromMnemonic(mnemonic)
      const privateKey = wallet.toWIF()
      window.localStorage.setItem('privateKey', privateKey)
      dispatch(updateWalletMeta({ mnemonic, privateKey }))
      const walletData = await wallet.getInfo()
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
    console.log({ error })
  }
}

export const fetchAchievements = ({ client }) => async dispatch => {
  try {
    dispatch({ type: STREAM_FETCH_ACHIEVEMENTS_REQUESTED })
    const response = await client.feed(process.env.STREAM_FEED, 'common', process.env.STREAM_FEED_TOKEN).get()
    const achievements = response.results
    dispatch({ type: STREAM_FETCH_ACHIEVEMENTS_SUCCEEDED, payload: { achievements } })
  } catch (error) {
    console.log({ error })
    dispatch({ type: STREAM_FETCH_ACHIEVEMENTS_FAILED, payload: { error } })
  }
}

export const confirmAchievement = ({ token, user, target }) => async dispatch => {
  try {
    dispatch({ type: ACHIEVEMENT_CONFIRM_REQUESTED })
    await axios.post(`${process.env.BACKEND_URL}/confirm`, { token, user, target })
    dispatch({ type: ACHIEVEMENT_CONFIRM_SUCCEEDED })
  } catch (error) {
    console.log({ error })
    dispatch({ type: ACHIEVEMENT_CONFIRM_FAILED, payload: { error } })
  }
}

export const sendSupport = (payload) => async dispatch => {
  try {
    dispatch({ type: SUPPORT_SEND_REQUESTED })
    const { wallet, author, amount } = payload
    await wallet.send(author, amount * 1e8, { feeRate: Math.ceil(0.004 * 1e8 / 100) })
    dispatch({ type: SUPPORT_SEND_SUCCEEDED })
  } catch (error) {
    console.log({ error })
    dispatch({ type: SUPPORT_SEND_FAILED, payload: { error } })
  }
}
