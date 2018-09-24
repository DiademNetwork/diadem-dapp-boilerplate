import { connect } from 'react-redux'
import S from '../../../selectors'

const mapStateToProps = (state) => ({
  facebookName: S.getFacebookName(state),
  facebookPictureUrl: S.getFacebookPictureUrl(state)
})

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
