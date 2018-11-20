import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import A from 'modules/actions'
import S from 'modules/selectors'

const mapStateToProps = (state) => ({
  balance: S.wallets.balance(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  withdraw: A.wallets.withdraw
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
