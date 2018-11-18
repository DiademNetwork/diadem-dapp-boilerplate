import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { userDecentAddress }) => ({
  achievements: S.achievements.processedList(state),
  canPerformActions: R.allPass([
    S.facebook.login.isLogged,
    S.facebook.registration.isRegistered,
    S.wallets.decent.isReady
  ])(state),
  createAchievementStatus: S.achievement.createStatus(state),
  fetchStatus: S.achievements.fetchStatus(state),
  lastLinkOfUserAchievementOrNull: S.achievements.lastLinkOfUserAchievementOrNull(userDecentAddress)(state)
})

const mapDispatchToProps = {
  createAchievement: A.achievement.create,
  updateAchievement: A.achievement.update
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
