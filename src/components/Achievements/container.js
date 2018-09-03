import { connect } from 'react-redux'
import { fetchAchievements } from '../../actions'

const mapStateToProps = ({ achievements }) => ({ achievementsData: achievements.data })

const mapDispatchToProps = { fetchAchievements }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
