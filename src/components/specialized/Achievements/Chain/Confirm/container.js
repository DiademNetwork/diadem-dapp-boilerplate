import { connect } from 'react-redux'
import A from 'modules/actions'
import S from 'modules/selectors'
import * as R from 'ramda'
import blockchains from 'configurables/blockchains'

const mapStateToProps = (state) => ({
  accessToken: S.login.userAccessToken(state),
  canPerformActions: R.allPass([
    S.login.isLogged,
    S.wallets.areAllReady
  ])(state),
  userID: S.login.userID(state),
  walletAddress: S.wallets.address(blockchains.primary.key)(state)
})

const mapDispatchToProps = {
  confirmAchievement: A.achievements.chain.confirm.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
