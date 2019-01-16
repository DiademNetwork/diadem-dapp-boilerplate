import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  list: S.achievements.list(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
