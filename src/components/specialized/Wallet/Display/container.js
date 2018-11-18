import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, props) => ({
  address: S.wallets.decent.address(state),
  balance: S.wallets.decent.balance(state),
  hasPendingTx: S.wallets.decent.hasPendingTx(state),
  unconfirmedBalance: S.wallets.decent.unconfirmedBalance(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
