import { connect } from 'react-redux'
import { fetchAchievements } from '../../actions'

const mapStateToProps = ({ achievements: { data } }) => {
  const achievements = data.filter(achievement => achievement.verb === 'create')
  return {
    achievements
  }
}

const mapDispatchToProps = { fetchAchievements }

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
