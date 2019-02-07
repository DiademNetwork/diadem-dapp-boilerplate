import { connect } from 'react-redux'
import S from 'modules/selectors'
import blockchains from 'configurables/blockchains'

const mapStateToProps = (state) => ({
  loggedUserName: S.network.userName(state),
  userAddress: S.wallets.address(blockchains.primary.key)(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
