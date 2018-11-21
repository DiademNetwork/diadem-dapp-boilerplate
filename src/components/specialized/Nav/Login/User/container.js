import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  userName: S.login.userName(state),
  userPictureUrl: S.login.userPictureUrl(state)
})

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
