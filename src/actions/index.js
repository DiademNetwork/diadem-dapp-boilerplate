import api from '../services/api'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import stream from 'getstream'
import notifications from '../services/notifications'
import types from './types'

const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_CREATE,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ASYNC_ACHIEVEMENT_UPDATE,
  ASYNC_STREAM_FETCH_ACHIEVEMENTS,
  ASYNC_STREAM_FETCH_TRANSACTIONS,
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
  try {
    const walletData = await wallet.getInfo()
    dispatch(updateWallet(walletData))
  } catch (error) {
    dispatch(notifications.walletRefreshError)
  }
}

export const recoverWallet = (mnemonic) => async dispatch => {
  try {
    const wallet = network.fromMnemonic(mnemonic)
    const privateKey = wallet.toWIF()
    window.localStorage.setItem('privateKey', privateKey)
    const walletData = await wallet.getInfo()
    dispatch(updateWallet(walletData))
    dispatch(updateWalletMeta({ wallet }))
    dispatch(updateWalletStatus('restored'))
  } catch (error) {
    dispatch(notifications.walletRecoverError)
  }
}

// Authentication and Wallet Generation/Restore
export const handleFacebookLogin = (facebookData) => async dispatch => {
  dispatch(updateFacebook(facebookData))
  dispatch(updateFacebookAuthenticationStatus('suceeded'))
  dispatch(notifications.facebookLoginSuccess)
  const { accessToken, userID } = facebookData
  try {
    const { data: { exists } } = await api.checkUser({ user: userID })
    if (!exists) {
      const mnemonic = generateMnemonic()
      const wallet = network.fromMnemonic(mnemonic)
      const privateKey = wallet.toWIF()
      window.localStorage.setItem('privateKey', privateKey)
      dispatch(updateWalletMeta({ mnemonic, privateKey }))
      const walletData = await wallet.getInfo()
      await api.registerUser({
        address: walletData.addrStr,
        user: userID,
        token: accessToken
      })
      dispatch(updateWalletMeta({ wallet }))
      dispatch(updateWallet(walletData))
      dispatch(updateWalletStatus('generated'))
      dispatch(notifications.walletGenerated)
    } else {
      const storedPrivateKey = window.localStorage.getItem('privateKey')
      if (!storedPrivateKey) {
        dispatch(updateWalletStatus('needs-recovering'))
      } else {
        const wallet = network.fromWIF(storedPrivateKey)
        dispatch(updateWalletMeta({ wallet }))
        await refreshWallet(wallet)(dispatch)
        dispatch(notifications.walletRestored)
        dispatch(updateWalletStatus('restored'))
      }
    }
  } catch (error) {
    dispatch(notifications.walletError)
    dispatch(updateWalletStatus('error'))
  }
}

export const fetchAchievements = () => async dispatch => {
  try {
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.requested })
    const response = await client.feed(process.env.STREAM_ACHIEVEMENTS_FEED, 'common', process.env.STREAM_ACHIEVEMENTS_FEED_TOKEN).get()
    const data = response.results
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.succeeded, data })
  } catch (error) {
    dispatch(notifications.fetchAchievementsError)
    dispatch({ type: ASYNC_STREAM_FETCH_ACHIEVEMENTS.failed, payload: { error } })
  }
}

export const fetchTransactions = () => async dispatch => {
  try {
    dispatch({ type: ASYNC_STREAM_FETCH_TRANSACTIONS.requested })
    const response = await client.feed(process.env.STREAM_TRANSACTIONS_FEED, 'common', process.env.STREAM_TRANSACTIONS_FEED_TOKEN).get()
    const data = response.results
    dispatch({ type: ASYNC_STREAM_FETCH_TRANSACTIONS.succeeded, data })
  } catch (error) {
    dispatch(notifications.fetchTransactionsError)
    dispatch({ type: ASYNC_STREAM_FETCH_TRANSACTIONS.failed, payload: { error } })
  }
}

export const confirmAchievement = ({ address, link, token, user }) => async dispatch => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.requested })
    await api.confirmAchievement({ address, link, token, user })
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.succeeded })
  } catch (error) {
    dispatch(notifications.confirmAchievementError)
    dispatch(notifications.confirmAchievementSuccess)
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.failed, payload: { error } })
  }
}

export const supportAchievement = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.requested })
    const { author, amount } = payload
    const { wallet } = getState()
    await wallet.walletMeta.wallet.send(author, amount * 1e8, { feeRate: Math.ceil(0.004 * 1e8 / 100) })
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.succeeded })
    dispatch(notifications.supportAchievementSuccess)
  } catch (error) {
    dispatch(notifications.supportAchievementError)
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.failed, payload: { error } })
  }
}

export const createAchievement = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_CREATE.requested })
    const { link, title } = payload
    const { facebook, wallet } = getState()
    const { accessToken, userID } = facebook.data
    const { addrStr } = wallet.data
    await api.createAchievement({
      address: addrStr,
      link,
      previousLink: '',
      title,
      token: accessToken,
      user: userID
    })
    dispatch({ type: ASYNC_ACHIEVEMENT_CREATE.succeeded })
    dispatch(notifications.createAchievementSuccess)
  } catch (error) {
    dispatch(notifications.createAchievementError)
    dispatch({ type: ASYNC_ACHIEVEMENT_CREATE.failed, payload: { error } })
  }
}

export const updateAchievement = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_UPDATE.requested })
    const { link, title, previousLink } = payload
    const { facebook, wallet } = getState()
    const { accessToken, userID } = facebook.data
    const { addrStr } = wallet.data
    await api.updateAchievement({
      address: addrStr,
      link,
      previousLink,
      title,
      token: accessToken,
      user: userID
    })
    dispatch({ type: ASYNC_ACHIEVEMENT_UPDATE.succeeded })
    dispatch(notifications.updateAchievementSuccess)
  } catch (error) {
    dispatch(notifications.updateAchievementError)
    dispatch({ type: ASYNC_ACHIEVEMENT_UPDATE.failed, payload: { error } })
  }
}
