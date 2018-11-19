import Notifications from 'react-notification-system-redux'
import uuidv1 from 'uuid/v1'

const getNotification = type => ({ title, message }) => Notifications[type]({
  position: 'bl',
  title,
  message: message || '',
  uid: uuidv1()
})

const createSuccessNotification = title => getNotification('success')({ title })
const createErrorNotification = title => getNotification('error')({ title })

export const ACHIEVEMENTS_FETCH_ERROR_MESSAGE = 'Impossible to fetch achievements'
export const ACHIEVEMENTS_RECEIVED_MESSAGE = 'New achievements events'
export const ACHIEVEMENT_CREATE_SUCCESS_MESSAGE = 'Achievement created. It will appear once confirmed on blockchain'
export const ACHIEVEMENT_CREATE_ERROR_MESSAGE = 'Impossible to create achievement. You may have an achievement creation pending'
export const ACHIEVEMENT_UPDATE_SUCCESS_MESSAGE = 'Achievement updated. It will appear once confirmed on blockchain'
export const ACHIEVEMENT_UPDATE_ERROR_MESSAGE = 'Impossible to update achievement'
export const ACHIEVEMENT_CONFIRM_SUCCESS_MESSAGE = 'Achievement confirmed. It will appear once confirmed on blockchain'
export const ACHIEVEMENT_CONFIRM_ERROR_MESSAGE = 'Impossible to confirm achievement'
export const ACHIEVEMENT_SUPPORT_SUCCESS_MESSAGE = 'Achievement supported. It will appear once confirmed on blockchain'
export const ACHIEVEMENT_SUPPORT_ERROR_MESSAGE = 'Impossible to support achievement'
export const ACHIEVEMENT_DEPOSIT_SUCCESS_MESSAGE = 'Deposit for achievement successful. It will appear once confirmed on blockchain'
export const ACHIEVEMENT_DEPOSIT_ERROR_MESSAGE = 'Impossible to deposit for achievement. You may need to retry with higher fees'
export const FACEBOOK_LOGIN_SUCCESS_MESSAGE = 'Facebook login success'
export const FACEBOOK_REGISTRATION_CHECK_ERROR_MESSAGE = 'Impossible to check your user existence'
export const FACEBOOK_REGISTRATION_SUCCESS_MESSAGE = 'Please wait, your registration is in process. You will be notified when confirmed on blockchain'
export const FACEBOOK_REGISTRATION_ERROR_MESSAGE = 'Impossible to register your account'
export const TRANSACTIONS_FETCH_ERROR_MESSAGE = 'Impossible to fetch transactions'
export const TRANSACTIONS_RECEIVED_MESSAGE = 'New user activity'
export const USERS_FETCH_ERROR_MESSAGE = 'Impossible to fetch users list'
export const WALLET_RECOVER_SUCCESS_MESSAGE = 'Wallet restored'
export const WALLET_RECOVER_ERROR_MESSAGE = 'Impossible to recover wallet'
export const WALLET_REFRESH_ERROR_MESSAGE = 'Impossible to refresh wallet'
export const WALLET_GENERATE_SUCCESS_MESSAGE = 'Diadem Network QTUM wallet generated'
export const WALLET_GENERATE_ERROR_MESSAGE = 'Impossible to generate your wallet'
export const WALLET_WITHDRAW_SUCCESS_MESSAGE = 'Tokens withdrawal successful'
export const WALLET_WITHDRAW_ERROR_MESSAGE = 'Impossible to withdraw tokens. You may need to retry with higher fees'
export const WALLET_RECEIVING_TOKENS_MESSAGE = 'Incoming tokens'
export const WALLET_SENDING_TOKENS_MESSAGE = 'Sending tokens. Please wait'
export const WALLET_TOKENS_RECEIVED_MESSAGE = 'New tokens are now available'
export const WALLET_TOKENS_SENT_MESSAGE = 'Tokens sent'

export default {
  achievementsFetchError: createErrorNotification(ACHIEVEMENTS_FETCH_ERROR_MESSAGE),
  achievementsReceived: createSuccessNotification(ACHIEVEMENTS_RECEIVED_MESSAGE),
  achievementCreateSuccess: createSuccessNotification(ACHIEVEMENT_CREATE_SUCCESS_MESSAGE),
  achievementCreateError: createErrorNotification(ACHIEVEMENT_CREATE_ERROR_MESSAGE),
  achievementUpdateSuccess: createSuccessNotification(ACHIEVEMENT_UPDATE_SUCCESS_MESSAGE),
  achievementUpdateError: createErrorNotification(ACHIEVEMENT_UPDATE_ERROR_MESSAGE),
  achievementConfirmSuccess: createSuccessNotification(ACHIEVEMENT_CONFIRM_SUCCESS_MESSAGE),
  achievementConfirmError: createErrorNotification(ACHIEVEMENT_CONFIRM_ERROR_MESSAGE),
  achievementSupportSuccess: createSuccessNotification(ACHIEVEMENT_SUPPORT_SUCCESS_MESSAGE),
  achievementSupportError: createErrorNotification(ACHIEVEMENT_SUPPORT_ERROR_MESSAGE),
  achievementDepositSuccess: createSuccessNotification(ACHIEVEMENT_DEPOSIT_SUCCESS_MESSAGE),
  achievementDepositError: createErrorNotification(ACHIEVEMENT_DEPOSIT_ERROR_MESSAGE),
  facebookLoginSuccess: createSuccessNotification(FACEBOOK_LOGIN_SUCCESS_MESSAGE),
  facebookRegistrationCheckError: createErrorNotification(FACEBOOK_REGISTRATION_CHECK_ERROR_MESSAGE),
  facebookRegistrationSuccess: createSuccessNotification(FACEBOOK_REGISTRATION_SUCCESS_MESSAGE),
  facebookRegistrationError: createErrorNotification(FACEBOOK_REGISTRATION_ERROR_MESSAGE),
  transactionsFetchError: createErrorNotification(TRANSACTIONS_FETCH_ERROR_MESSAGE),
  transactionsReceived: createSuccessNotification(TRANSACTIONS_RECEIVED_MESSAGE),
  usersFetchError: createErrorNotification(USERS_FETCH_ERROR_MESSAGE),
  walletRecoverSuccess: createSuccessNotification(WALLET_RECOVER_SUCCESS_MESSAGE),
  walletRecoverError: createErrorNotification(WALLET_RECOVER_ERROR_MESSAGE),
  walletRefreshError: createErrorNotification(WALLET_REFRESH_ERROR_MESSAGE),
  walletGenerateSuccess: createSuccessNotification(WALLET_GENERATE_SUCCESS_MESSAGE),
  walletGenerateError: createErrorNotification(WALLET_GENERATE_ERROR_MESSAGE),
  walletWithdrawSuccess: createSuccessNotification(WALLET_WITHDRAW_SUCCESS_MESSAGE),
  walletWithdrawError: createErrorNotification(WALLET_WITHDRAW_ERROR_MESSAGE),
  walletReceivingTokens: createSuccessNotification(WALLET_RECEIVING_TOKENS_MESSAGE),
  walletSendingTokens: createSuccessNotification(WALLET_SENDING_TOKENS_MESSAGE),
  walletTokensReceived: createSuccessNotification(WALLET_TOKENS_RECEIVED_MESSAGE),
  walletTokensSent: createSuccessNotification(WALLET_TOKENS_SENT_MESSAGE)
}
