import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { chain }) => ({
  accessToken: S.login.userAccessToken(state),
  canPerformActions: R.allPass([
    S.login.isLogged,
    S.registration.isRegistered,
    S.wallets.isReady
  ])(state),
  currentAchievement: S.achievements.chain.currentFrom(chain),
  pastAchievements: S.achievements.chain.pastFrom(chain),
  userID: S.login.userID(state),
  walletAddress: S.wallets.address(state),
  walletBalance: S.wallets.balance(state)
})

const mapDispatchToProps = {
  confirmAchievement: A.achievements.chain.confirm.requested,
  depositForAchievement: A.achievements.chain.deposit.requested,
  supportAchievement: A.achievements.chain.support.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
