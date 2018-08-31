import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { storeWalletInfo } from '../../actions'

const mapStateToProps = ({ walletInfo }) => ({ walletInfo })

const mapDispatchToProps = dispatch => bindActionCreators({
  storeWalletInfo
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
