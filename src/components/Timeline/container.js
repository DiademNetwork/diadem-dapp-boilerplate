import { connect } from 'react-redux'
import { getSortedTransactions, isFacebookAuthenticated } from '../../selectors'
import { updateTransactionsMeta } from '../../actions'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  transactions: getSortedTransactions(state)
})

const mapDispatchToProps = {
  updateTransactionsMeta
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
