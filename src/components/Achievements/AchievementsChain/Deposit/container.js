import { connect } from 'react-redux'
import * as A from '../../../../actions'
import S from '../../../../selectors'

const mapStateToProps = (state, { creatorID }) => ({
  users: S.getAllUsersBut(creatorID)(state)
})

const mapDispatchToProps = {
  fetchUsers: A.fetchUsers
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
