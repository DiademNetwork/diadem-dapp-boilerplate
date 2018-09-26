import { connect } from 'react-redux'
import * as A from '../../actions'
import S from '../../selectors'

const mapStateToProps = (state) => ({
  achievementsChains: S.getProcessedAchievementsChains(state),
  canUserConfirmCreateUpdateSupportDeposit: S.canUserConfirmCreateUpdateSupportDeposit(state),
  createAchievementStatus: S.getAchievementCreateStatus(state),
  fetchStatus: S.getAchievementsFetchStatus(state),
  lastLinkOfUserAchievementOrNull: S.lastLinkOfUserAchievementOrNull(state)
})

const mapDispatchToProps = {
  createAchievement: A.createAchievement,
  fetchAchievements: A.fetchAchievements,
  suscribeToAchievements: A.suscribeToAchievements,
  updateAchievement: A.updateAchievement
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
