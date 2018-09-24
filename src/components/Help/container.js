import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as A from '../../actions'
import * as S from '../../selectors'

const mapStateToProps = (state) => ({
  isHelpDisplayed: S.getUIisHelpedDisplayed(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  hideHelp: A.hideHelp
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
