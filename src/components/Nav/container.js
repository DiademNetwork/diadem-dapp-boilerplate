import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleHelp: A.ui.general.toggleHelp
}, dispatch)

export default WrappedComponent =>
  connect(null, mapDispatchToProps)(WrappedComponent)
