import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  isFacebookLogged: S.facebook.login.isLogged(state),
  loadFailReason: S.wallets.qtum.loadFailReason(state),
  userID: S.facebook.login.userID(state),
  walletStatus: S.wallets.qtum.status(state)
})

export default WrappedComponent =>
  connect(mapStateToProps, null)(WrappedComponent)
