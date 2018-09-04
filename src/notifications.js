import Notifications from 'react-notification-system-redux'

const NOTIFICATIONS_POSITION = 'bl' // bottom-left

const baseOptions = {
  position: NOTIFICATIONS_POSITION,
  autoDismiss: 5 // in seconds
}

const getNotification = type => (title, message) => Notifications[type]({
  ...baseOptions,
  title,
  message
})

export default {
  facebookLoginSuccess: getNotification('success')(
    'Facebook login success',
    'You can now use the wallet and see your timeline'
  )
}
