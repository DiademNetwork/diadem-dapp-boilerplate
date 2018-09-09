import Notifications from 'react-notification-system-redux'

const NOTIFICATIONS_POSITION = 'bl' // bottom-left

const baseOptions = {
  position: NOTIFICATIONS_POSITION
}

const getNotification = type => (title, message) => Notifications[type]({
  ...baseOptions,
  title,
  message
})

export default {
  unknownError: getNotification('error')(
    'An error occured',
    'Sorry for inconvenience'
  ),
  facebookLoginSuccess: getNotification('success')(
    'Facebook login success',
    'You can now use the wallet and see your timeline'
  ),
  walletRestored: getNotification('success')(
    'Wallet restored',
    'You can now support achievements!'
  ),
  walletGenerated: getNotification('success')(
    'Diadem Network QTUM wallet generated',
    'Please safe mnemonic and privateKey somewhere safe'
  )
}
