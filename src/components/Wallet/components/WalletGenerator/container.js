import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { storeWalletInfo } from '../../../../actions'

const mapDispatchToProps = dispatch => bindActionCreators({
  storeWalletInfo
}, dispatch)

export default WrappedComponent =>
  connect(null, mapDispatchToProps)(WrappedComponent)
