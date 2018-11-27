import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  isRegistered: S.wallets.isRegistered(blockchain.key)(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
