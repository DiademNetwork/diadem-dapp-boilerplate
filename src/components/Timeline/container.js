import { connect } from 'react-redux'
import { getSortedTransactions, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  transactions: getSortedTransactions(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
