import api from '../services/api'
import * as R from 'ramda'
import insight from '../services/insight'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import notifications from '../services/notifications'
import stream from '../services/stream'
import T from './types'

const network = networks[process.env.QTUM_NETWORK]

// Facebook
export const updateFacebook = (data) => ({ type: T.FACEBOOK_UPDATE_DATA, data })
export const updateFacebookAuthenticationStatus = (status) => ({ type: T.FACEBOOK_UPDATE_AUTHENTICATION_STATUS, status })

// Wallet
export const updateWallet = (data) => ({ type: T.WALLET_UPDATE_DATA, data })
export const updateWalletMeta = (meta) => ({ type: T.WALLET_UPDATE_META, meta })
export const updateWalletStatus = (status) => ({ type: T.WALLET_UPDATE_STATUS, status })

export const refreshWallet = (wallet) => async (dispatch, getState) => {
  try {
    const walletData = await wallet.getInfo()
    const { wallet: { data } } = getState()
    if (R.complement(R.equals)(data, walletData)) {
      dispatch(updateWallet(walletData))
    }
  } catch (error) {
    dispatch(notifications.walletRefreshError)
  }
}

export const checkUserAddressAndLoadWallet = ({ walletData, wallet, userID }) => async (dispatch) => {
  const { data: { ok } } = await api.checkUserAddress({ user: userID, walletAddress: walletData.addrStr })
  if (ok) {
    dispatch(updateWallet(walletData))
    dispatch(updateWalletMeta({ wallet }))
    dispatch(notifications.walletRestored)
    dispatch(updateWalletStatus('restored'))
  } else {
    dispatch(updateWalletStatus('recover-failed'))
  }
}

export const recoverWallet = ({ mnemonic, privateKey }) => async (dispatch, getState) => {
  try {
    let wallet
    const { facebook: { data: { userID } } } = getState()
    if (privateKey) {
      wallet = network.fromWIF(privateKey)
    } else if (mnemonic) {
      wallet = network.fromMnemonic(mnemonic)
      privateKey = wallet.toWIF()
    } else {
      throw new Error()
    }
    window.localStorage.setItem(`privateKey-${userID}`, privateKey)
    const walletData = await wallet.getInfo()
    await checkUserAddressAndLoadWallet({ walletData, wallet, userID })(dispatch)
  } catch (error) {
    dispatch(notifications.walletRecoverError)
  }
}

export const checkUserRegistration = () => async (dispatch, getState) => {
  try {
    const { facebook: { data: { userID } } } = getState()
    const { data: { pending } } = await api.checkUser({ user: userID })
    if (!pending) {
      dispatch(updateWalletMeta({
        isRegistrationPending: false,
        isUserRegistered: true
      }))
      dispatch(notifications.userRegistrationSuccess)
      await loadWallet(userID)(dispatch)
    }
  } catch (error) {
    dispatch(notifications.checkUserError)
  }
}

export const loadWallet = (userID) => async (dispatch) => {
  try {
    const storedPrivateKey = window.localStorage.getItem(`privateKey-${userID}`)
    if (!storedPrivateKey) {
      dispatch(updateWalletStatus('needs-recovering'))
    } else {
      const wallet = network.fromWIF(storedPrivateKey)
      const walletData = await wallet.getInfo()
      await checkUserAddressAndLoadWallet({ walletData, wallet, userID })(dispatch)
    }
  } catch (error) {
    dispatch(notifications.walletError)
    dispatch(updateWalletStatus('error'))
  }
}

const registerUser = async ({ accessToken, name, userID }, dispatch) => {
  const mnemonic = generateMnemonic()
  const wallet = network.fromMnemonic(mnemonic)
  const privateKey = wallet.toWIF()
  window.localStorage.setItem(`privateKey-${userID}`, privateKey)
  dispatch(updateWalletMeta({ mnemonic, privateKey }))
  const walletData = await wallet.getInfo()
  dispatch(updateWalletMeta({ wallet }))
  dispatch(updateWallet(walletData))
  await api.registerUser({
    address: walletData.addrStr,
    name,
    user: userID,
    token: accessToken
  })
  dispatch(updateWalletStatus('generated'))
  dispatch(notifications.walletGenerated)
  dispatch(updateWalletMeta({ isRegistrationPending: true }))
}

export const handleFacebookLogin = (facebookData) => async (dispatch) => {
  try {
    dispatch(updateFacebook(facebookData))
    dispatch(updateFacebookAuthenticationStatus('suceeded'))
    dispatch(notifications.facebookLoginSuccess)
    const { accessToken, name, userID } = facebookData
    const { data: { exists, pending } } = await api.checkUser({ user: userID })
    if (exists) {
      dispatch(updateWalletMeta({ isUserRegistered: true }))
      return loadWallet(userID)(dispatch)
    } else {
      if (pending) {
        return dispatch(updateWalletMeta({ isRegistrationPending: true }))
      } else {
        return registerUser({ accessToken, name, userID }, dispatch)
      }
    }
  } catch (error) {
    dispatch(notifications.checkUserError)
  }
}

export const updateAchievementsData = (data) => async dispatch => {
  dispatch({ type: T.ACHIEVEMENTS_UPDATE_DATA, data })
}

export const updateAchievementsFail = () => async dispatch => {
  dispatch(notifications.fetchAchievementsError)
}

export const updateTransactionsData = (data) => async dispatch => {
  dispatch({ type: T.TRANSACTIONS_UPDATE_DATA, data })
}

export const confirmAchievement = ({ address, link, token, user }) => async dispatch => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CONFIRM.requested })
    await api.confirmAchievement({ address, link, token, user })
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CONFIRM.succeeded })
    dispatch(notifications.confirmAchievementSuccess)
  } catch (error) {
    dispatch(notifications.confirmAchievementError)
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CONFIRM.failed, payload: { error } })
  }
}

export const supportAchievement = ({ amount, fees, link }) => async (dispatch, getState) => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_SUPPORT.requested })
    const { data: { address, encodedData } } = await api.encodeSupport({ link })
    const { facebook, wallet } = getState()
    const rawTx = await wallet.meta.wallet.generateContractSendTx(address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    const { accessToken, userID } = facebook.data
    await api.supportAchievement({
      address: wallet.data.addrStr,
      link,
      rawTx,
      token: accessToken,
      user: userID
    })
    dispatch({ type: T.ASYNC_ACHIEVEMENT_SUPPORT.succeeded })
    dispatch(notifications.supportAchievementSuccess)
  } catch (error) {
    dispatch(notifications.supportAchievementError)
    dispatch({ type: T.ASYNC_ACHIEVEMENT_SUPPORT.failed, payload: { error } })
  }
}

export const depositForAchievement = ({
  amount,
  fees,
  link,
  witnessAddress,
  witnessName,
  witnessUserID
}) => async (dispatch, getState) => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_DEPOSIT.requested })
    const { facebook, wallet } = getState()
    const { data: { address, encodedData } } = await api.encodeDeposit({ link, witness: witnessAddress })
    const rawTx = await wallet.meta.wallet.generateContractSendTx(address, encodedData, {
      amount: amount * 1e8,
      feeRate: fees
    })
    const { accessToken, userID } = facebook.data
    await api.depositForAchievement({
      address: wallet.data.addrStr,
      link,
      rawTx,
      token: accessToken,
      user: userID,
      witness: witnessUserID,
      witnessName
    })
    dispatch({ type: T.ASYNC_ACHIEVEMENT_DEPOSIT.succeeded })
    dispatch(notifications.depositAchievementSuccess)
  } catch (error) {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_DEPOSIT.failed, payload: { error } })
    dispatch(notifications.depositAchievementError)
  }
}

export const createAchievement = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CREATE.requested })
    const { link, title } = payload
    const { facebook, wallet } = getState()
    const { accessToken, name, userID } = facebook.data
    const { addrStr } = wallet.data
    await api.createAchievement({
      address: addrStr,
      link,
      name,
      previousLink: '',
      title,
      token: accessToken,
      user: userID
    })
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CREATE.succeeded })
    dispatch(notifications.createAchievementSuccess)
  } catch (error) {
    dispatch(notifications.createAchievementError)
    dispatch({ type: T.ASYNC_ACHIEVEMENT_CREATE.failed, payload: { error } })
  }
}

export const updateAchievement = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENT_UPDATE.requested })
    const { link, title, previousLink } = payload
    const { facebook, wallet } = getState()
    const { accessToken, name, userID } = facebook.data
    const { addrStr } = wallet.data
    await api.updateAchievement({
      address: addrStr,
      link,
      name,
      previousLink,
      title,
      token: accessToken,
      user: userID
    })
    dispatch({ type: T.ASYNC_ACHIEVEMENT_UPDATE.succeeded })
    dispatch(notifications.updateAchievementSuccess)
  } catch (error) {
    dispatch(notifications.updateAchievementError)
    dispatch({ type: T.ASYNC_ACHIEVEMENT_UPDATE.failed, payload: { error } })
  }
}

export const updateTransactionsMeta = (meta) => ({ type: T.TRANSACTIONS_UPDATE_META, meta })
export const updateAchievementsMeta = (meta) => ({ type: T.ACHIEVEMENTS_UPDATE_META, meta })

export const displayNotification = (notification) => (dispatch) => {
  dispatch(notification)
}

export const withdrawFromHotWallet = ({address, amount, fees}) => async (dispatch, getState) => {
  try {
    const { wallet: { meta: { wallet } } } = getState()
    await wallet.send(address, amount * 1e8, { feeRate: fees })
    dispatch(notifications.withdrawTokensSuccess)
  } catch (error) {
    dispatch(notifications.withdrawTokensError)
  }
}

// Ui
export const showHelp = () => ({ type: T.UI_SHOW_HELP })
export const hideHelp = () => ({ type: T.UI_HIDE_HELP })

// Users
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: T.ASYNC_USERS_FETCH.requested })
    const { data: { usersList: items } } = await api.fetchUsers()
    dispatch({ type: T.ASYNC_USERS_FETCH.succeeded, data: { items } })
  } catch (error) {
    dispatch({ type: T.ASYNC_USERS_FETCH.failed, payload: { error } })
    dispatch(notifications.fetchUsersError)
  }
}

export const checkLastUserTransactions = (transactions) => async (dispatch) => {
  let hasPendingTransactions = false
  for (let transaction of transactions) {
    const { data: { confirmations } } = await insight.checkTransactions(`insight-api/tx/${transaction}`)
    hasPendingTransactions = hasPendingTransactions || confirmations === 0
  }
  dispatch(updateWalletMeta({ hasPendingTransactions }))
}

export const fetchTransactions = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: T.ASYNC_TRANSACTIONS_FETCH.requested })
    stream.fetchData(
      'transactions',
      ({ results: items, hasMore }) => dispatch({
        type: T.ASYNC_TRANSACTIONS_FETCH.succeeded,
        data: { items },
        meta: { hasMore }
      }),
      () => new Error('Fetch transactions failed'),
      page
    )
  } catch (error) {
    dispatch({ type: T.ASYNC_TRANSACTIONS_FETCH.failed })
    dispatch(notifications.fetchTransactionsError)
  }
}

export const suscribeToTransactions = () => async (dispatch) => {
  stream.suscribeWithCallBacks('transactions', ({ new: items }) => {
    dispatch(notifications.newTransactions)
    dispatch({ type: T.TRANSACTIONS_UPDATE_META, meta: { hasUnread: true } })
    dispatch({ type: T.TRANSACTIONS_UPDATE_DATA, data: { items } })
  })
}

export const fetchAchievements = () => async (dispatch) => {
  try {
    dispatch({ type: T.ASYNC_ACHIEVEMENTS_FETCH.requested })
    stream.fetchData(
      'achievements',
      ({ results: items }) => dispatch({ type: T.ASYNC_ACHIEVEMENTS_FETCH.succeeded, data: { items } }),
      (err) => {
        console.log('error ?', err)
        return new Error('Fetch achievements failed')
      }
    )
  } catch (error) {
    dispatch({ type: T.ASYNC_ACHIEVEMENTS_FETCH.failed })
    dispatch(notifications.fetchAchievementsError)
  }
}

export const suscribeToAchievements = () => async (dispatch) => {
  stream.suscribeWithCallBacks('achievements', ({ new: items }) => {
    dispatch(notifications.newAchievements)
    dispatch({ type: T.ACHIEVEMENTS_UPDATE_META, meta: { hasUnread: true } })
    dispatch({ type: T.ACHIEVEMENTS_UPDATE_DATA, data: { items } })
  })
}
