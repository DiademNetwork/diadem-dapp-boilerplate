import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showHelp } from '../../actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showHelp
}, dispatch)

export default WrappedComponent =>
  connect(null, mapDispatchToProps)(WrappedComponent)
