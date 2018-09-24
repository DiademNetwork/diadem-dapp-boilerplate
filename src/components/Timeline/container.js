import { connect } from 'react-redux'
import S from '../../selectors'
import * as A from '../../actions'

const mapStateToProps = (state) => ({
  fetchStatus: S.getTransactionsFetchStatus(state),
  hasMoreTransactions: S.getTransactionsHasMore(state),
  transactions: S.getTransactionsItems(state)
})

const mapDispatchToProps = {
  fetchTransactions: A.fetchTransactions,
  suscribeToTransactions: A.suscribeToAchievements
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
