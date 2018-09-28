import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  recoverFailReason: S.wallets.qtum.recoverFailReason(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  recover: A.wallets.qtum.recover
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
