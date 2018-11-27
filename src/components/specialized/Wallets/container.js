import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isLogged: S.login.isLogged(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
