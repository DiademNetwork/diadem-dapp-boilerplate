import { connect } from 'react-redux'
import { refreshWallet } from '../../../../actions'

const mapStateToProps = ({ wallet }) => ({
  walletData: wallet.data,
  walletMeta: wallet.meta
})

const mapDispatchToProps = { refreshWallet }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
