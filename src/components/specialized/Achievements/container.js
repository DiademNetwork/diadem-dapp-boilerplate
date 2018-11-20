import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { userQtumAddress }) => ({
  achievements: S.achievements.list.processedList(state),
  canPerformActions: R.allPass([
    S.login.isLogged,
    S.registration.isRegistered,
    S.wallets.isReady
  ])(state),
  createAchievementStatus: S.achievements.chain.createStatus(state),
  fetchStatus: S.achievements.list.fetchStatus(state),
  lastLinkOfUserAchievementOrNull: S.achievements.list.lastLinkOfUserAchievementOrNull(userQtumAddress)(state)
})

const mapDispatchToProps = {
  createAchievement: A.achievements.chain.create.requested,
  updateAchievement: A.achievements.chain.update.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
