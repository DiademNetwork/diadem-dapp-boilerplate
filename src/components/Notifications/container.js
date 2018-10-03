import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  notifications: S.ui.notifications.list(state)
})

export default WrappedComponent => connect(
  mapStateToProps
)(WrappedComponent)
