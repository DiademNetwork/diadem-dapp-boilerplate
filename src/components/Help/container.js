import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isHelpDisplayed: S.ui.general.isHelpDisplayed(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleHelp: A.ui.general.toggleHelp
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
