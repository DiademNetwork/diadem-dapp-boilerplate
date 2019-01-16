import { connect } from 'react-redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  isLogged: S.login.isLogged(state),
  areAllWalletsReady: S.wallets.areAllReady(state)
})

const mapDispatchToProps = {
  createAchievement: A.achievements.chain.create.requested,
  updateAchievement: A.achievements.chain.update.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
