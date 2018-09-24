import { connect } from 'react-redux'
import * as A from '../../actions'
import S from '../../selectors'

const mapStateToProps = (state, props) => ({
  address: S.getWalletAddress(state),
  balance: S.getWalletBalance(state),
  hasPendingTransactions: S.getWalletHasPendingTransactions(state),
  unconfirmedBalance: S.getWalletUnconfimredBalance(state),
  lastUserTransactions: S.getLastUserTransactions(state, props),
  mnemonic: S.getWalletMnemonic(state),
  privateKey: S.getWalletPrivateKey(state),
  wallet: S.getWalletUtil(state),
  walletStatus: S.getWalletStatus(state),
  isRegistrationPending: S.getWalletIsRegistrationPending(state),
  isFacebookAuthenticated: S.isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  checkLastUserTransactions: A.checkLastUserTransactions,
  checkUserRegistration: A.checkUserRegistration,
  displayNotification: A.displayNotification,
  recoverWallet: A.recoverWallet,
  refreshWallet: A.refreshWallet,
  updateWalletStatus: A.updateWalletStatus,
  withdrawFromHotWallet: A.withdrawFromHotWallet
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
