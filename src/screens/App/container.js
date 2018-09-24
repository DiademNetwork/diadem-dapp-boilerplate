import { connect } from 'react-redux'
import { getAchievementsMeta, getFacebookUserID, getTransactionsMeta } from '../../selectors'

const mapStateToProps = (state) => ({
  hasUnreadTransactions: getTransactionsMeta('hasUnread')(state),
  hasUnreadAchievements: getAchievementsMeta('hasUnread')(state),
  userID: getFacebookUserID(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
