import api from '../services/api'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import notifications from '../services/notifications'
import types from './types'

const {
  ASYNC_ACHIEVEMENT_CONFIRM,
  ASYNC_ACHIEVEMENT_CREATE,
  ASYNC_ACHIEVEMENT_SUPPORT,
  ASYNC_ACHIEVEMENT_DEPOSIT,
  ASYNC_ACHIEVEMENT_UPDATE,
  ACHIEVEMENTS_UPDATE_DATA,
  TRANSACTIONS_UPDATE_DATA,
  ACHIEVEMENTS_UPDATE_META,
  TRANSACTIONS_UPDATE_META,
  UI_SHOW_HELP,
  UI_HIDE_HELP,
  WALLET_UPDATE_DATA,
  WALLET_UPDATE_META,
  WALLET_UPDATE_STATUS,
  FACEBOOK_UPDATE_DATA,
  FACEBOOK_UPDATE_AUTHENTICATION_STATUS
} = types

const network = networks.testnet

// Facebook
export const updateFacebook = (data) => ({ type: FACEBOOK_UPDATE_DATA, data })
export const updateFacebookAuthenticationStatus = (status) => ({ type: FACEBOOK_UPDATE_AUTHENTICATION_STATUS, status })

// Wallet
export const updateWallet = (data) => ({ type: WALLET_UPDATE_DATA, data })
export const updateWalletMeta = (meta) => ({ type: WALLET_UPDATE_META, meta })
export const updateWalletStatus = (status) => ({ type: WALLET_UPDATE_STATUS, status })

export const refreshWallet = (wallet) => async (dispatch) => {
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
export const handleFacebookLogin = (facebookData) => async (dispatch, getState) => {
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

export const updateAchievementsSuccess = (data) => async dispatch => {
  dispatch({ type: ACHIEVEMENTS_UPDATE_DATA, data })
}

export const updateAchievementsFail = () => async dispatch => {
  dispatch(notifications.fetchAchievementsError)
}

export const updateTransactionsSuccess = (data) => async dispatch => {
  dispatch({ type: TRANSACTIONS_UPDATE_DATA, data })
}

export const updateTransactionsFail = () => async dispatch => {
  dispatch(notifications.fetchTransactionsError)
}

export const confirmAchievement = ({ address, link, token, user }) => async dispatch => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.requested })
    await api.confirmAchievement({ address, link, token, user })
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.succeeded })
    dispatch(notifications.confirmAchievementSuccess)
  } catch (error) {
    dispatch(notifications.confirmAchievementError)
    dispatch({ type: ASYNC_ACHIEVEMENT_CONFIRM.failed, payload: { error } })
  }
}

export const supportAchievement = ({ amount, wallet: targetAddress, link }) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.requested })
    const { encodedData } = await api.encodeSupport({ amount, link })
    const { wallet } = getState()
    const rawTx = await wallet.walletMeta.wallet.generateContractSendTx(targetAddress, encodedData, {
      amount: amount * 1e8
    })
    await api.supportAchievement({ rawTx })
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.succeeded })
    dispatch(notifications.supportAchievementSuccess)
  } catch (error) {
    dispatch(notifications.supportAchievementError)
    dispatch({ type: ASYNC_ACHIEVEMENT_SUPPORT.failed, payload: { error } })
  }
}

export const depositForAchievement = ({ amount, wallet: targetAddress, link, witnessUserID }) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASYNC_ACHIEVEMENT_DEPOSIT.requested })
    const { encodedData } = await api.encodeSupport({ amount, link })
    const { wallet } = getState()
    const rawTx = await wallet.walletMeta.wallet.generateContractSendTx(targetAddress, encodedData, {
      amount: amount * 1e8
    })
    await api.supportAchievement({ rawTx })
    dispatch({ type: ASYNC_ACHIEVEMENT_DEPOSIT.succeeded })
    dispatch(notifications.depositAchievementSuccess)
  } catch (error) {
    dispatch({ type: ASYNC_ACHIEVEMENT_DEPOSIT.failed, payload: { error } })
    dispatch(notifications.depositAchievementError)
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

export const updateTransactionsMeta = (meta) => ({ type: TRANSACTIONS_UPDATE_META, meta })
export const updateAchievementsMeta = (meta) => ({ type: ACHIEVEMENTS_UPDATE_META, meta })

export const displayNotification = (notification) => (dispatch) => {
  dispatch(notification)
}

// Ui
export const showHelp = () => ({ type: UI_SHOW_HELP })
export const hideHelp = () => ({ type: UI_HIDE_HELP })
