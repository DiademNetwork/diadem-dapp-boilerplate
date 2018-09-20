import { connect } from 'react-redux'
import { confirmAchievement, depositForAchievement, supportAchievement } from '../../../actions'
import {
  getFacebookDataProp,
  getWallet,
  getSortedTransactions,
  canUserConfirmCreateUpdateSupportDeposit
} from '../../../selectors'

const mapStateToProps = (state) => ({
  accessToken: getFacebookDataProp('accessToken')(state),
  canUserConfirmCreateUpdateSupportDeposit: canUserConfirmCreateUpdateSupportDeposit(state),
  transactions: getSortedTransactions(state),
  userID: getFacebookDataProp('userID')(state),
  walletAddress: getWallet('addrStr')(state),
  walletBalance: getWallet('balance')(state)
})

const mapDispatchToProps = {
  confirmAchievement,
  depositForAchievement,
  supportAchievement
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
