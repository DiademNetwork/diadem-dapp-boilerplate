import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, props) => ({
  address: S.wallets.qtum.address(state),
  balance: S.wallets.qtum.balance(state),
  hasPendingTx: S.wallets.qtum.hasPendingTx(state),
  unconfirmedBalance: S.wallets.qtum.unconfirmedBalance(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
