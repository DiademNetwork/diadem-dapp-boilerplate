import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  recoverFailReason: S.wallets.qtum.recoverFailReason(state),
  walletStatus: S.wallets.qtum.status(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  recover: A.wallets.qtum.recover.requested
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
