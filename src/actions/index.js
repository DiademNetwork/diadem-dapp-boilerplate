import {
  SUPPORT_SEND_REQUESTED,
  SUPPORT_SEND_SUCCEEDED,
  SUPPORT_SEND_FAILED,
  STORE_WALLET_INFO
} from './types'

export const storeWalletInfo = (payload) => ({
  type: STORE_WALLET_INFO,
  payload
})

export const sendSupport = (payload) => async dispatch => {
  try {
    dispatch({ type: SUPPORT_SEND_REQUESTED })
    const { wallet, author, amount } = payload
    await wallet.send(author, amount * 1e8)
    dispatch({ type: SUPPORT_SEND_SUCCEEDED })
  } catch (error) {
    console.log({ error })
    dispatch({ type: SUPPORT_SEND_FAILED })
  }
}
