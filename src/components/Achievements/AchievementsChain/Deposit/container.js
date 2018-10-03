import { connect } from 'react-redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { creatorID }) => ({
  users: S.users.listWithoutFacebookUser(creatorID)(state)
})

const mapDispatchToProps = {
  fetchUsers: A.users.fetch.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
