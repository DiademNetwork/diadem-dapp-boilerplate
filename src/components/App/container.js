import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { incrementClickCount } from '../../actions'

const mapStateToProps = ({ clickCount }) => ({
  clickCount
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      incrementClickCount
    },
    dispatch
  )

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
