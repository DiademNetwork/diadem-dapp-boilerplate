import { connect } from 'react-redux'
import { getAchievementsMeta, getFacebookUserID, getTransactionsMeta } from '../../selectors'

const mapStateToProps = (state) => ({
  achievementsNotificationCount: getAchievementsMeta('notificationCount')(state),
  transactionsNotificationCount: getTransactionsMeta('notificationCount')(state),
  userID: getFacebookUserID(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
