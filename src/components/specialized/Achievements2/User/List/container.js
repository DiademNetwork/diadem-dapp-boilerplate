import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  list: S.achievements.userList(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
