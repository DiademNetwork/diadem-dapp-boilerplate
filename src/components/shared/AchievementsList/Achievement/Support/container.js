import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  canPerformActions: R.allPass([
    S.login.isLogged,
    S.wallets.areAllReady
  ])(state),
  walletsBalances: S.wallets.balances(state)
})

const mapDispatchToProps = {
  supportAchievement: A.achievements.support.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
