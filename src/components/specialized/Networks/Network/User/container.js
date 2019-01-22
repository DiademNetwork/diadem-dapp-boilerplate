import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  userName: S.network.userName(state),
  userPictureUrl: S.network.userPictureUrl(state)
})

export default WrappedComponent => connect(mapStateToProps)(WrappedComponent)
