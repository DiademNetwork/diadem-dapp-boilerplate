import { connect } from 'react-redux'
import usersActions from '../../actions/users'
import S from '../../selectors'

const mapStateToProps = (state) => ({
  users: S.getUsersItems(state),
  fetchStatus: S.getUsersFetchStatus(state)
})

const mapDispatchToProps = {
  fetchUsers: usersActions.fetch.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
