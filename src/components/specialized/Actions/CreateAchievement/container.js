import { connect } from 'react-redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isPrimaryWalletReady: S.wallets.isPrimaryReady(state)
})

const mapDispatchToProps = {
  createAchievement: A.achievements.create.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
