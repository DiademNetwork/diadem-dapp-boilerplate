import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state, { blockchain }) => ({
  address: S.wallets.address(blockchain.key)(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
