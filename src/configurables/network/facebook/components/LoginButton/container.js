import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isLogged: S.login.isLogged(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleFacebookLogin: A.login.logged
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
