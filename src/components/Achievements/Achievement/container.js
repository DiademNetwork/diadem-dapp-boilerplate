import { connect } from 'react-redux'
import * as A from '../../../actions'
import S from '../../../selectors'

const mapStateToProps = (state) => ({
  accessToken: S.getFacebookAccessToken(state),
  canUserConfirmCreateUpdateSupportDeposit: S.canUserConfirmCreateUpdateSupportDeposit(state),
  transactions: S.getTransactionsItems(state),
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
