import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  recoverFailReason: S.wallets.recoverFailReason(state),
  walletStatus: S.wallets.status(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  recover: A.wallets.recover.requested
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
