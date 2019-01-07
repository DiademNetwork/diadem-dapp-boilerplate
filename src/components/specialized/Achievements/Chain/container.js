import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, { chain }) => ({
  currentAchievement: S.achievements.chain.currentFrom(chain),
  pastAchievements: S.achievements.chain.pastFrom(chain),
  userID: S.login.userID(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
