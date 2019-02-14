import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash
})

export default WrappedComponent =>
  connect(mapStateToProps, { pushHistory: push })(WrappedComponent)
