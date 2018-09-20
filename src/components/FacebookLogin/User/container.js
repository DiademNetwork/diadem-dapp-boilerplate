import { connect } from 'react-redux'

import { getFacebookDataProp, getFacebookPictureUrl } from '../../../selectors'

const mapStateToProps = (state) => ({
  facebookName: getFacebookDataProp('name')(state),
  facebookPictureUrl: getFacebookPictureUrl(state)
})
export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
