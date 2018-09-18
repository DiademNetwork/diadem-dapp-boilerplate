import { connect } from 'react-redux'
import { getSortedTransactions } from '../../selectors'
import { updateTransactionsMeta } from '../../actions'

const mapStateToProps = (state) => ({
  transactions: getSortedTransactions(state)
})

const mapDispatchToProps = {
  updateTransactionsMeta
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
