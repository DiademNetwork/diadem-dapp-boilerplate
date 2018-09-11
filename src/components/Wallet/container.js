import { connect } from 'react-redux'
import {
  displayNotification,
  recoverWallet,
  refreshWallet,
  updateWalletStatus
} from '../../actions'
import {
  isFacebookAuthenticated,
  getWallet,
  getWalletMeta,
  getWalletStatus
} from '../../selectors'

const mapStateToProps = (state) => ({
  address: getWallet('addrStr')(state),
  balance: getWallet('balance')(state),
  unconfirmedBalance: getWallet('unconfirmedBalance')(state),
  mnemonic: getWalletMeta('mnemonic')(state),
  privateKey: getWalletMeta('privateKey')(state),
  wallet: getWalletMeta('wallet')(state),
  walletStatus: getWalletStatus(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  displayNotification,
  recoverWallet,
  refreshWallet,
  updateWalletStatus: (status) => dispatch => dispatch(updateWalletStatus(status))
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
