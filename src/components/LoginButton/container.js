import { connect } from 'react-redux'
import { handleFacebookLogin } from '../../actions'

import { getFacebook, getFacebookPictureUrl, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  facebookName: getFacebook('name')(state),
  facebookPictureUrl: getFacebookPictureUrl(state),
  isFacebookAuthenticated: isFacebookAuthenticated(state)
})

const mapDispatchToProps = { handleFacebookLogin }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
