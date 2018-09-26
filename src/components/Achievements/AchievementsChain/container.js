import { connect } from 'react-redux'
import * as A from '../../../actions'
import S from '../../../selectors'

const mapStateToProps = (state, { achievementsChain }) => ({
  accessToken: S.getFacebookAccessToken(state),
  canUserConfirmCreateUpdateSupportDeposit: S.canUserConfirmCreateUpdateSupportDeposit(state),
  currentAchievement: S.getCurrentAchievementFromChain(achievementsChain),
  pastAchievements: S.getPastAchievementsFromChain(achievementsChain),
  userID: S.getFacebookUserID(state),
  walletAddress: S.getWalletAddress(state),
  walletBalance: S.getWalletBalance(state)
})

const mapDispatchToProps = {
  confirmAchievement: A.confirmAchievement,
  depositForAchievement: A.depositForAchievement,
  supportAchievement: A.supportAchievement
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
