import { connect } from 'react-redux'
import { getAllTransactionsData, isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  transactions: getAllTransactionsData(state)
})

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
