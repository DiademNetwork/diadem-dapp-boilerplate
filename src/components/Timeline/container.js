import { connect } from 'react-redux'
import {
  getSortedTransactions,
  getTransactionsFetchStatus,
  getTransactionsMeta
} from '../../selectors'
import {
  fetchTransactions,
  suscribeToTransactions
} from '../../actions'

const mapStateToProps = (state) => ({
  fetchStatus: getTransactionsFetchStatus(state),
  hasMoreTransactions: getTransactionsMeta('hasMore')(state),
  transactions: getSortedTransactions(state)
})

const mapDispatchToProps = {
  fetchTransactions,
  suscribeToTransactions
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
