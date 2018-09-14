import { connect } from 'react-redux'
import { fetchUsers } from '../../actions'
import { getUsers, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  users: getUsers(state)
})

const mapDispatchToProps = {
  fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
