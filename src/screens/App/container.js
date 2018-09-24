import { connect } from 'react-redux'
import S from '../../selectors'

const mapStateToProps = (state) => ({
  hasUnreadTransactions: S.getTransactionsMeta('hasUnread')(state),
  hasUnreadAchievements: S.getAchievementsMeta('hasUnread')(state),
  userID: S.getFacebookUserID(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
