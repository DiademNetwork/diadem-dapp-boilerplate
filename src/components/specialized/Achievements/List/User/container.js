import { connect } from 'react-redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  list: S.achievements.userList(state)
})

const mapDispatchToProps = {
  fetch: A.achievements.fetchUser.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
