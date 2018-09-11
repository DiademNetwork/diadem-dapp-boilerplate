import { connect } from 'react-redux'
import { recoverWallet, updateWalletStatus } from '../../actions'
import { isFacebookAuthenticated, getWallet, getWalletMeta, getWalletStatus } from '../../selectors'

const mapStateToProps = (state) => ({
  address: getWallet('addrStr')(state),
  balance: getWallet('balance')(state),
  mnemonic: getWalletMeta('mnemonic')(state),
  privateKey: getWalletMeta('privateKey')(state),
  walletStatus: getWalletStatus(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  recoverWallet,
  updateWalletStatus: (status) => dispatch => dispatch(updateWalletStatus(status))
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)