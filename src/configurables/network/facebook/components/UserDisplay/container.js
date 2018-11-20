import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  facebookName: S.login.name(state),
  facebookPictureUrl: S.login.pictureUrl(state)
})

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
