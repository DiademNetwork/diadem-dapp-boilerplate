import Notifications from 'react-notification-system-redux'
import uuidv1 from 'uuid/v1'

const NOTIFICATIONS_POSITION = 'bl'

const baseNotificationsOpts = {
  position: NOTIFICATIONS_POSITION
}
const getNotification = type => ({ title, message }) => Notifications[type]({
  ...baseNotificationsOpts,
  title,
  message: message || '',
  uid: uuidv1()
})

export default {
  unknownError: getNotification('error')({
    title: 'An error occured'
  }),
  fetchAchievementsError: getNotification('error')({
    title: 'Impossible to fetch achievements'
  }),
  fetchTransactionsError: getNotification('error')({
    title: 'Impossible to fetch transactions'
  }),
  facebookLoginSuccess: getNotification('success')({
    title: 'Facebook login success'
  }),
  walletRestored: getNotification('success')({
    title: 'Wallet restored'
  }),
  walletRecoverError: getNotification('error')({
    title: 'Impossible to recover wallet'
  }),
  walletRefreshError: getNotification('error')({
    title: 'Impossible to refresh wallet'
  }),
  walletGenerated: getNotification('success')({
    title: 'Diadem Network QTUM wallet generated'
  }),
  walletError: getNotification('error')({
    title: 'An error occured with Diadem Wallet'
  }),
  createAchievementSuccess: getNotification('success')({
    title: 'Achievement created'
  }),
  createAchievementError: getNotification('error')({
    title: 'Impossible to create achievement'
  }),
  updateAchievementSuccess: getNotification('success')({
    title: 'Achievement updated'
  }),
  updateAchievementError: getNotification('error')({
    title: 'Impossible to update achievement'
  }),
  confirmAchievementSuccess: getNotification('success')({
    title: 'Achievement confirmed'
  }),
  confirmAchievementError: getNotification('error')({
    title: 'Impossible to confirm achievement'
  }),
  supportAchievementSuccess: getNotification('success')({
    title: 'Achievement supported'
  }),
  supportAchievementError: getNotification('error')({
    title: 'Impossible to support achievement'
  }),
  newAchievements: getNotification('success')({
    title: 'New achievements'
  }),
  newTransactions: getNotification('success')({
    title: 'New transactions'
  })
}
