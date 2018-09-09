import { connect } from 'react-redux'
import { fetchUserTransactions } from '../../actions'
import { isFacebookAuthenticated } from '../../selectors'

const mapStateToProps = (state) => ({
  isFacebookAuthenticated: isFacebookAuthenticated(state),
  userTransactions: state.userTransactions.data,
  userID: state.facebook.data.userID
})

const mapDispatchToProps = { fetchUserTransactions }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
