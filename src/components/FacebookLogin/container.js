import { connect } from 'react-redux'
import * as A from '../../actions'
import S from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: S.isFacebookAuthenticated(state)
})

const mapDispatchToProps = {
  handleFacebookLogin: A.handleFacebookLogin
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
