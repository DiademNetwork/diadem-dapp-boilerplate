import { connect } from 'react-redux'
import { fetchUserTransactions } from '../../actions'
import { isFBAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFBAuthenticated: isFBAuthenticated(state),
  userTransactions: state.userTransactions.data,
  userID: state.facebook.data.userID
})

const mapDispatchToProps = { fetchUserTransactions }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
