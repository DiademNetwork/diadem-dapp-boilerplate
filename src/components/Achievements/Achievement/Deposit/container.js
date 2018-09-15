import { connect } from 'react-redux'
import { fetchUsers } from '../../../../actions'
import { getAllOtherUsers } from '../../../../selectors'

const mapStateToProps = (state) => ({
  users: getAllOtherUsers(state)
})

const mapDispatchToProps = {
  fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
