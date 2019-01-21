import { connect } from 'react-redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  list: S.achievements.list(state)
})

const mapDispatchToProps = {
  fetchAchievements: A.achievements.fetch.requested
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
