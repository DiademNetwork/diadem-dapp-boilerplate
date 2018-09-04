import { connect } from 'react-redux'

const mapStateToProps = state => ({ notifications: state.notifications })

export default WrappedComponent => connect(
  mapStateToProps
)(WrappedComponent)
