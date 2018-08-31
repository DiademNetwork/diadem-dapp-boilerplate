import { connect } from 'react-redux'

const mapStateToProps = ({ walletInfo }) => ({ walletInfo })

export default WrappedComponent =>
  connect(mapStateToProps)(WrappedComponent)
