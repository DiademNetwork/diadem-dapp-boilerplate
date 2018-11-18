import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isFacebookLogged: S.facebook.login.isLogged(state),
  loadFailReason: S.wallets.decent.loadFailReason(state),
  userID: S.facebook.login.userID(state),
  walletStatus: S.wallets.decent.status(state)
})

export default WrappedComponent =>
  connect(mapStateToProps, null)(WrappedComponent)
