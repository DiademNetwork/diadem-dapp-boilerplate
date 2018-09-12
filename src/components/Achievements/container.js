import { connect } from 'react-redux'
import { createAchievement, updateAchievement, updateAchievementsMeta } from '../../actions'
import {
  getSortedAchievements,
  hasUserCreatedAnAchievement,
  isWalletReady,
  isFacebookAuthenticated
} from '../../selectors'

const mapStateToProps = (state) => ({
  achievements: getSortedAchievements(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  isWalletReady: isWalletReady(state),
  hasUserCreatedAnAchievement: hasUserCreatedAnAchievement(state)
})

const mapDispatchToProps = {
  createAchievement,
  updateAchievement,
  updateAchievementsMeta
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
