import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  hasUnreadTransactions: S.transactions.hasUnread(state),
  hasUnreadAchievements: S.achievements.hasUnread(state),
  userID: S.facebook.login.userID(state),
  userQtumAddress: S.wallets.qtum.address(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
