import { connect } from 'react-redux'
import {
  checkUserRegistration,
  displayNotification,
  recoverWallet,
  refreshWallet,
  loadWallet
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
  isRegistrationPending: getWalletMeta('isRegistrationPending')(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  checkUserRegistration,
  displayNotification,
  recoverWallet,
  refreshWallet,
  loadWallet
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
