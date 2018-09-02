import axios from 'axios'
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
  STORE_WALLET_INFO,
  STORE_FACEBOOK_INFO
} from './types'

export const storeWalletInfo = (payload) => ({
  type: STORE_WALLET_INFO,
  payload
})

export const storeFacebookInfo = (payload) => ({
  type: STORE_FACEBOOK_INFO,
  payload
})

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
