import { connect } from 'react-redux'
import { createAchievement, updateAchievement, updateAchievementsMeta } from '../../actions'
import { isWalletReady, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  achievementsData: state.achievements.data,
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  isWalletReady: isWalletReady(state)
})

const mapDispatchToProps = {
  createAchievement,
  updateAchievement,
  updateAchievementsMeta
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
