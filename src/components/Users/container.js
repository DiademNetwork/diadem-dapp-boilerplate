import { connect } from 'react-redux'
import * as A from '../../actions'
import S from '../../selectors'

const mapStateToProps = (state) => ({
  users: S.getUsersItems(state),
  fetchStatus: S.getUsersFetchStatus(state)
})

const mapDispatchToProps = {
  fetchUsers: A.fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
