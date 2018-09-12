import { connect } from 'react-redux'
import {
  createAchievement,
  updateAchievement,
  updateAchievementsMeta
} from '../../actions'
import {
  canCreateOrUpdateAchievement,
  getProcessedAchievements,
  hasUserCreatedAnAchievement
} from '../../selectors'

const mapStateToProps = (state) => ({
  achievements: getProcessedAchievements(state),
  canCreateOrUpdateAchievement: canCreateOrUpdateAchievement(state),
  hasUserCreatedAnAchievement: hasUserCreatedAnAchievement(state)
})

const mapDispatchToProps = {
  createAchievement,
  updateAchievement,
  updateAchievementsMeta
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
