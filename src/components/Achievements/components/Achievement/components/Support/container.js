import { connect } from 'react-redux'
import { supportAchievement } from '../../../../../../actions'

const mapStateToProps = (state) => ({
  walletData: state.wallet.data,
  walletMeta: state.wallet.meta,
  support: state.support
})

const mapDispatchToProps = { supportAchievement }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
