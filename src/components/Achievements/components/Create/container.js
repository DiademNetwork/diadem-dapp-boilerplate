import { connect } from 'react-redux'
import { createAchievement } from '../../../../actions'
import { isFBAuthenticatedAndWalletReady } from '../../../../selectors'

const mapStateToProps = (state) => ({
  isFBAuthenticatedAndWalletReady: isFBAuthenticatedAndWalletReady(state),
  createAchievementStatus: state.achievements.createStatus
})

const mapDispatchToProps = { createAchievement }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
