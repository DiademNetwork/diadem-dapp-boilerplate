import { connect } from 'react-redux'
import { createAchievement, fetchAchievements } from '../../actions'

const mapStateToProps = ({ achievements }) => ({ achievementsData: achievements.data })

const mapDispatchToProps = { createAchievement, fetchAchievements }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
