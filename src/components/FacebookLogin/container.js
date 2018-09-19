import { connect } from 'react-redux'
import { handleFacebookLogin } from '../../actions'

import { isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = { handleFacebookLogin }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
