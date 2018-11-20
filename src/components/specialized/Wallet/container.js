import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isFacebookLogged: S.login.isLogged(state),
  loadFailReason: S.wallets.loadFailReason(state),
  userID: S.login.userID(state),
  walletStatus: S.wallets.status(state)
})

export default WrappedComponent =>
  connect(mapStateToProps, null)(WrappedComponent)
