import { connect } from 'react-redux'
import { confirmAchievement, depositForAchievement, supportAchievement } from '../../../actions'
import { getFacebook, getWallet, isFacebookAuthenticatedAndWalletReady } from '../../../selectors'

const mapStateToProps = (state) => ({
  accessToken: getFacebook('accessToken')(state),
  isFacebookAuthenticatedAndWalletReady: isFacebookAuthenticatedAndWalletReady(state),
  userID: getFacebook('userID')(state),
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
