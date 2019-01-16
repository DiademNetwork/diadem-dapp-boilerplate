import { connect } from 'react-redux'
import * as R from 'ramda'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  canCreateAchievement: R.allPass([
    S.login.isLogged,
    S.wallets.areAllReady
  ])(state)
})

const mapDispatchToProps = {
  createAchievement: A.achievements.create.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
