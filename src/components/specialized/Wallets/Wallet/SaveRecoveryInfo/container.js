import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  mnemonic: S.wallets.mnemonic(blockchain.key)(state),
  privateKey: S.wallets.privateKey(blockchain.key)(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  generateWallet: A.wallets.generate.requested
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
