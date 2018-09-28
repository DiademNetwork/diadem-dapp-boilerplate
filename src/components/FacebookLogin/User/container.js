import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  facebookName: S.facebook.login.name(state),
  facebookPictureUrl: S.facebook.login.pictureUrl(state)
})

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
