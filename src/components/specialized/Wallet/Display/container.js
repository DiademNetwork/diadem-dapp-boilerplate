import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, props) => ({
  address: S.wallets.address(state),
  balance: S.wallets.balance(state),
  hasPendingTx: S.wallets.hasPendingTx(state),
  unconfirmedBalance: S.wallets.unconfirmedBalance(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
