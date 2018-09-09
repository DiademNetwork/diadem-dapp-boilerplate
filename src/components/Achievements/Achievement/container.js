import { connect } from 'react-redux'
import { confirmAchievement, supportAchievement } from '../../../actions'
import { getFacebook, getWallet, isFacebookAuthenticated } from '../../../selectors'

const mapStateToProps = (state) => ({
  accessToken: getFacebook('accessToken')(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  userID: getFacebook('userID')(state),
  walletAddress: getWallet('addrStr')(state),
  walletBalance: getWallet('balance')(state)
})

const mapDispatchToProps = {
  confirmAchievement,
  supportAchievement
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
