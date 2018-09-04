import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateWalletMeta, updateWalletStatus } from '../../../../actions'

const mapStateToProps = (state) => ({
  walletMeta: state.wallet.meta
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateWalletMeta,
  updateWalletStatus
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
