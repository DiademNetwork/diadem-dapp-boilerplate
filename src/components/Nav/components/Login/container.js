import { connect } from 'react-redux'
import { handleFacebookLogin } from '../../../../actions'

import { getFacebook, isFBAuthenticated } from '../../../../selectors'

const mapStateToProps = (state) => ({
  name: getFacebook('name')(state),
  picture: getFacebook('picture')(state),
  isFBAuthenticated: isFBAuthenticated(state)
})

const mapDispatchToProps = { handleFacebookLogin }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
