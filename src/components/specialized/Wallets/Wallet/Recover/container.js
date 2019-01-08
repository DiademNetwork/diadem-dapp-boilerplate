import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  status: S.wallets.status(blockchain.key)(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  recoverWallet: A.wallets.recover.requested
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
