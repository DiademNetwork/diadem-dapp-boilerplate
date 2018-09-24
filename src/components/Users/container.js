import { connect } from 'react-redux'
import { fetchUsers } from '../../actions'
import { getUsers, getUsersFetchStatus } from '../../selectors'

const mapStateToProps = (state) => ({
  users: getUsers(state),
  fetchStatus: getUsersFetchStatus(state)
})

const mapDispatchToProps = {
  fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
