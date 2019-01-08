import { connect } from 'react-redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  walletsBalances: S.wallets.balances(state)
})

const mapDispatchToProps = {
  supportAchievement: A.achievements.chain.support.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
