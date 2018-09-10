import { connect } from 'react-redux'
import { fetchTransactions } from '../../actions'
import { getAllTransactionsData, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  transactions: getAllTransactionsData(state)
})

const mapDispatchToProps = { fetchTransactions }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
