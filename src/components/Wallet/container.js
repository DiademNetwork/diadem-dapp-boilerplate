import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateWallet } from '../../actions'
import { isFBAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  walletStatus: state.wallet.status,
  walletData: state.wallet.data,
  isFBAuthenticated: isFBAuthenticated(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateWallet
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
