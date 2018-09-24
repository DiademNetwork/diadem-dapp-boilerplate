import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as A from '../../actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showHelp: A.showHelp
}, dispatch)

export default WrappedComponent =>
  connect(null, mapDispatchToProps)(WrappedComponent)
