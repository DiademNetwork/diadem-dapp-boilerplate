import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  hasUnreadAchievements: S.achievements.list.hasUnread(state),
  userID: S.login.userID(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  achievementsOpenned: A.achievements.openned
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
