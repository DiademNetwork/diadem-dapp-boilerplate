import { connect } from 'react-redux'
import { sendSupport } from '../../../../actions'

const mapStateToProps = ({ wallet, walletInfo, support }) => ({ wallet, walletInfo, support })

const mapDispatchToProps = { sendSupport }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
