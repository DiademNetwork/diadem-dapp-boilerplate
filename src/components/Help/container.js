import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideHelp } from '../../actions'

const mapStateToProps = (state) => ({
  isHelpDisplayed: state.ui.isHelpDisplayed
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hideHelp
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
