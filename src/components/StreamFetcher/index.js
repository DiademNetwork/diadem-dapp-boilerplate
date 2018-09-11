import { Component } from 'react'
import stream from '../../services/stream'
import notifications from '../../services/notifications'
import withContainer from './container'
import { PropTypes as T } from 'prop-types'

class StreamFetcher extends Component {
  componentWillReceiveProps ({
    achievementsCount: newAchievementsCount,
    transactionsCount: newTransactionsCount
  }) {
    const {
      achievementsCount,
      displayNotification,
      hasAchievementsLoadedOnce,
      hasTransactionsLoadedOnce,
      transactionsCount,
      updateAchievementsMeta,
      updateTransactionsMeta
    } = this.props
    if (newAchievementsCount > achievementsCount) {
      if (hasAchievementsLoadedOnce) {
        updateAchievementsMeta({ notificationCount: newAchievementsCount - achievementsCount })
        displayNotification(notifications.newAchievements)
      } else {
        updateAchievementsMeta({ loadedOnce: true })
      }
    }
    if (newTransactionsCount > transactionsCount) {
      if (hasTransactionsLoadedOnce) {
        updateTransactionsMeta({ notificationCount: newTransactionsCount - transactionsCount })
        displayNotification(notifications.newTransactions)
      } else {
        updateTransactionsMeta({ loadedOnce: true })
      }
    }
  }

  async componentDidMount () {
    const {
      updateAchievementsSuccess,
      updateAchievementsFail,
      updateTransactionsSuccess,
      updateTransactionsFail
    } = this.props
    stream.fetchData('achievements', updateAchievementsSuccess, updateAchievementsFail)
    stream.fetchData('transactions', updateTransactionsSuccess, updateTransactionsFail)
    stream.suscribeWithCallBacks('achievements', ({ new: newData }) => updateAchievementsSuccess(newData))
    stream.suscribeWithCallBacks('transactions', ({ new: newData }) => updateTransactionsSuccess(newData))
  }

  render () {
    return null
  }
}

StreamFetcher.propTypes = {
  achievementsCount: T.number,
  displayNotification: T.func,
  hasAchievementsLoadedOnce: T.bool,
  hasTransactionsLoadedOnce: T.bool,
  transactionsCount: T.number,
  updateAchievementsSuccess: T.func,
  updateAchievementsFail: T.func,
  updateTransactionsSuccess: T.func,
  updateTransactionsFail: T.func,
  updateAchievementsMeta: T.func,
  updateTransactionsMeta: T.func
}

export default withContainer(StreamFetcher)
