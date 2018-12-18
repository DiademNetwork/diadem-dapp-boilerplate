import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  balance: S.wallets.balance(blockchain.key)(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  withdraw: A.wallets.withdraw.requested
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
