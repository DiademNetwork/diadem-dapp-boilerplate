import { connect } from 'react-redux'

import { getFacebook, getFacebookPictureUrl } from '../../../selectors'

const mapStateToProps = (state) => ({
  facebookName: getFacebook('name')(state),
  facebookPictureUrl: getFacebookPictureUrl(state)
})
export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
