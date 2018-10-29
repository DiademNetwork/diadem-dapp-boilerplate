import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  fetchStatus: S.users.fetchStatus(state),
  users: S.users.list(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
