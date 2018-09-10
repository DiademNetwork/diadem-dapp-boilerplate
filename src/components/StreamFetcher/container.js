import { connect } from 'react-redux'
import {
  getAchievementsCount,
  getAchievementsMeta,
  getTransactionsCount,
  getTransactionsMeta
} from '../../selectors'

import {
  displayNotification,
  updateAchievementsSuccess,
  updateAchievementsFail,
  updateTransactionsSuccess,
  updateTransactionsFail,
  updateAchievementsMeta,
  updateTransactionsMeta
} from '../../actions'

const mapStateToProps = (state) => ({
  achievementsCount: getAchievementsCount(state),
  transactionsCount: getTransactionsCount(state),
  hasAchievementsLoadedOnce: getAchievementsMeta('loadedOnce')(state),
  hasTransactionsLoadedOnce: getTransactionsMeta('loadedOnce')(state)
})

const mapDispatchToProps = {
  displayNotification,
  updateAchievementsSuccess,
  updateAchievementsFail,
  updateTransactionsSuccess,
  updateTransactionsFail,
  updateAchievementsMeta: (meta) => dispatch => dispatch(updateAchievementsMeta(meta)),
  updateTransactionsMeta: (meta) => dispatch => dispatch(updateTransactionsMeta(meta))
}

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
