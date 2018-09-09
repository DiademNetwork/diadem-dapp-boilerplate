import { connect } from 'react-redux'

const mapStateToProps = ({ notifications }) => ({ notifications })

export default WrappedComponent => connect(
  mapStateToProps
)(WrappedComponent)
