import { connect } from 'react-redux'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  userID: S.facebook.login.userID(state),
  isFacebookLogged: S.facebook.login.isLogged(state),
  walletStatus: S.wallets.qtum.status(state)
})

export default WrappedComponent =>
  connect(mapStateToProps, null)(WrappedComponent)
