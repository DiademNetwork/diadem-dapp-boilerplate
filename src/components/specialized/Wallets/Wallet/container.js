import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  balance: S.wallets.balance(blockchain.key)(state),
  unconfirmedBalance: S.wallets.unconfirmedBalance(blockchain.key)(state),
  isRegistered: S.wallets.isRegistered(blockchain.key)(state),
  isRegistrationPending: S.wallets.isRegistrationPending(blockchain.key)(state),
  status: S.wallets.status(blockchain.key)(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
