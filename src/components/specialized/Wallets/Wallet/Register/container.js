import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  generateWallet: A.wallets.generate.requested
}, dispatch)

export default WrappedComponent =>
  connect(null, mapDispatchToProps)(WrappedComponent)
