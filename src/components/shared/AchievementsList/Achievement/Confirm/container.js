import { connect } from 'react-redux'
import A from 'modules/actions'
import S from 'modules/selectors'
import blockchains from 'configurables/blockchains'

const mapStateToProps = (state) => ({
  isPrimaryWalletReady: S.wallets.isPrimaryReady(state),
  userAddress: S.wallets.address(blockchains.primary.key)(state)
})

const mapDispatchToProps = {
  confirmAchievement: A.achievements.confirm.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
