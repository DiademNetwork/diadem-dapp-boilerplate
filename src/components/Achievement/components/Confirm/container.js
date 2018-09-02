import { connect } from 'react-redux'
import { confirmAchievement } from '../../../../actions'

const mapStateToProps = ({ fbInfo }) => ({ fbInfo })

const mapDispatchToProps = { confirmAchievement }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
