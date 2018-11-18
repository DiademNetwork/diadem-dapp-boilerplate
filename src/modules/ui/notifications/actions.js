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

export default {
  achievementsFetchError: createErrorNotification('Impossible to fetch achievements'),
  achievementsReceived: createSuccessNotification('New achievements events'),
  achievementCreateSuccess: createSuccessNotification('Achievement created. It will appear once confirmed on blockchain'),
  achievementCreateError: createErrorNotification('Impossible to create achievement. You may have an achievement creation pending'),
  achievementUpdateSuccess: createSuccessNotification('Achievement updated. It will appear once confirmed on blockchain'),
  achievementUpdateError: createErrorNotification('Impossible to update achievement'),
  achievementConfirmSuccess: createSuccessNotification('Achievement confirmed. It will appear once confirmed on blockchain'),
  achievementConfirmError: createErrorNotification('Impossible to confirm achievement'),
  achievementSupportSuccess: createSuccessNotification('Achievement supported. It will appear once confirmed on blockchain'),
  achievementSupportError: createErrorNotification('Impossible to support achievement. You may need to retry with higher fees'),
  achievementDepositSuccess: createSuccessNotification('Deposit for achievement successful. It will appear once confirmed on blockchain'),
  achievementDepositError: createErrorNotification('Impossible to deposit for achievement. You may need to retry with higher fees'),
  facebookLoginSuccess: createSuccessNotification('Facebook login success'),
  facebookRegistrationCheckError: createErrorNotification('Impossible to check your user existence'),
  facebookRegistrationSuccess: createErrorNotification('Please wait, your registration is in process. You will be notified when confirmed on blockchain'),
  facebookRegistrationError: createErrorNotification('Impossible to register your account'),
  transactionsFetchError: createErrorNotification('Impossible to fetch transactions'),
  transactionsReceived: createSuccessNotification('New user activity'),
  usersFetchError: createErrorNotification('Impossible to fetch users list'),
  walletRecoverSuccess: createSuccessNotification('Wallet restored'),
  walletRecoverError: createErrorNotification('Impossible to recover wallet'),
  walletRefreshError: createErrorNotification('Impossible to refresh wallet'),
  walletGenerateSuccess: createSuccessNotification('Diadem Network Decent wallet generated'),
  walletGenerateError: createErrorNotification('Impossible to generate your wallet'),
  walletWithdrawSuccess: createSuccessNotification('Tokens withdrawal successful'),
  walletWithdrawError: createErrorNotification('Impossible to withdraw tokens. You may need to retry with higher fees'),
  walletReceivingTokens: createSuccessNotification('Incoming tokens'),
  walletSendingTokens: createSuccessNotification('Sending tokens. Please wait'),
  walletTokensReceived: createSuccessNotification('New tokens are now available'),
  walletTokensSent: createSuccessNotification('Tokens sent')
}
