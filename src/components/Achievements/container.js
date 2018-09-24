import { connect } from 'react-redux'
import {
  createAchievement,
  fetchAchievements,
  suscribeToAchievements,
  updateAchievement
} from '../../actions'
import {
  canUserConfirmCreateUpdateSupportDeposit,
  getAchievementsFetchStatus,
  getProcessedAchievements,
  lastLinkOfUserAchievementOrNull,
  getAchievementCreateStatus
} from '../../selectors'

const mapStateToProps = (state) => ({
  achievements: getProcessedAchievements(state),
  canUserConfirmCreateUpdateSupportDeposit: canUserConfirmCreateUpdateSupportDeposit(state),
  createAchievementStatus: getAchievementCreateStatus(state),
  fetchStatus: getAchievementsFetchStatus(state),
  lastLinkOfUserAchievementOrNull: lastLinkOfUserAchievementOrNull(state)
})

const mapDispatchToProps = {
  createAchievement,
  fetchAchievements,
  suscribeToAchievements,
  updateAchievement
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
