import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, props) => ({
  address: S.wallets.qtum.address(state),
  balance: S.wallets.qtum.balance(state),
  lastUserTx: S.transactions.lastForUser(state, props),
  hasPendingTx: S.wallets.qtum.hasPendingTx(state),
  unconfirmedBalance: S.wallets.qtum.unconfirmedBalance(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  checkLastTx: A.wallets.qtum.checkLastTx,
  refresh: A.wallets.qtum.refresh
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
