import { connect } from 'react-redux'
import { fetchUsers } from '../../../../actions'
import { getUsers } from '../../../../selectors'

const mapStateToProps = (state) => ({
  users: getUsers(state)
})

const mapDispatchToProps = {
  fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
