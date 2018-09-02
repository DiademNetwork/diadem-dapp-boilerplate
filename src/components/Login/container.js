import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { storeFacebookInfo } from '../../actions'

const mapStateToProps = ({ fbInfo }) => ({
  fbInfo
})

const mapDispatchToProps = dispatch => bindActionCreators({
  storeFacebookInfo
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
