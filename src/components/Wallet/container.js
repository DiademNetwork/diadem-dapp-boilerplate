import { connect } from 'react-redux'
import {
  checkLastUserTransactions,
  checkUserRegistration,
  displayNotification,
  recoverWallet,
  refreshWallet,
  updateWalletStatus,
  withdrawFromHotWallet
} from '../../actions'
import {
  isFacebookAuthenticated,
  getLastUserTransactions,
  getWallet,
  getWalletMeta,
  getWalletStatus
} from '../../selectors'

const mapStateToProps = (state, props) => ({
  address: getWallet('addrStr')(state),
  balance: getWallet('balance')(state),
  hasPendingTransactions: getWalletMeta('hasPendingTransactions')(state),
  unconfirmedBalance: getWallet('unconfirmedBalance')(state),
  lastUserTransactions: getLastUserTransactions(state, props),
  mnemonic: getWalletMeta('mnemonic')(state),
  privateKey: getWalletMeta('privateKey')(state),
  wallet: getWalletMeta('wallet')(state),
  walletStatus: getWalletStatus(state),
  isRegistrationPending: getWalletMeta('isRegistrationPending')(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  checkLastUserTransactions,
  checkUserRegistration,
  displayNotification,
  recoverWallet,
  refreshWallet,
  updateWalletStatus,
  withdrawFromHotWallet
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
