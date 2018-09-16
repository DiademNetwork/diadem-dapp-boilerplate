import { connect } from 'react-redux'
import { fetchUsers } from '../../../../actions'
import { getAllOtherUsers } from '../../../../selectors'

const mapStateToProps = (state, props) => ({
  users: getAllOtherUsers(state, props)
})

const mapDispatchToProps = {
  fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
