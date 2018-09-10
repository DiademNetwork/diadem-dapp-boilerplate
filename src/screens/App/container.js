import { connect } from 'react-redux'
import { getAchievementsMeta, getTransactionsMeta } from '../../selectors'

const mapStateToProps = (state) => ({
  achievementsNotificationCount: getAchievementsMeta('notificationCount')(state),
  transactionsNotificationCount: getTransactionsMeta('notificationCount')(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
