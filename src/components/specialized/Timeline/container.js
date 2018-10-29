import { connect } from 'react-redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  fetchStatus: S.transactions.fetchStatus(state),
  hasMoreTransactions: S.transactions.hasMore(state),
  transactions: S.transactions.list(state)
})

const mapDispatchToProps = {
  fetchTransactions: A.transactions.fetch.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
