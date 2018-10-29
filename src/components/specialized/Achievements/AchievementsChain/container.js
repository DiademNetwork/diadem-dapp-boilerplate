import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { achievementsChain }) => ({
  accessToken: S.facebook.login.accessToken(state),
  canPerformActions: R.allPass([
    S.facebook.login.isLogged,
    S.facebook.registration.isRegistered,
    S.wallets.qtum.isReady
  ])(state),
  currentAchievement: S.achievement.currentFrom(achievementsChain),
  pastAchievements: S.achievement.pastFrom(achievementsChain),
  userID: S.facebook.login.userID(state),
  walletAddress: S.wallets.qtum.address(state),
  walletBalance: S.wallets.qtum.balance(state)
})

const mapDispatchToProps = {
  confirmAchievement: A.achievement.confirm,
  depositForAchievement: A.achievement.deposit,
  supportAchievement: A.achievement.support
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
