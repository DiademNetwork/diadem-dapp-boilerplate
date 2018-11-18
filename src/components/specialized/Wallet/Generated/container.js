import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  mnemonic: S.wallets.decent.mnemonic(state),
  privateKey: S.wallets.decent.privateKey(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  infoSaved: A.wallets.decent.infoSaved
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
