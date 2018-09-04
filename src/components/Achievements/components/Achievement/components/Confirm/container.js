import { connect } from 'react-redux'
import { confirmAchievement } from '../../../../../../actions'
import { getFacebook, isFBAuthenticated } from '../../../../../../selectors'

const mapStateToProps = (state) => ({
  accessToken: getFacebook('accessToken')(state),
  isFBAuthenticated: isFBAuthenticated(state),
  userID: getFacebook('userID')(state)
})

const mapDispatchToProps = { confirmAchievement }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
