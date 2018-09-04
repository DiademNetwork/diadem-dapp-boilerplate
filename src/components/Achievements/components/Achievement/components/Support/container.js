import { connect } from 'react-redux'
import { sendSupport } from '../../../../../../actions'

const mapStateToProps = (state) => ({
  walletData: state.wallet.data,
  walletMeta: state.wallet.meta,
  support: state.support
})

const mapDispatchToProps = { sendSupport }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
