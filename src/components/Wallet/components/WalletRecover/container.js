import { connect } from 'react-redux'
import { recoverWallet } from '../../../../actions'

const mapStateToProps = (state) => ({
  walletStatus: state.wallet.status
})

const mapDispatchToProps = { recoverWallet }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
