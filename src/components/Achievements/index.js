import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Achievement from './Achievement'
import withContainer from './container'
import Create from './Create'
import Update from './Update'
import sortByTime from '../../helpers/sort-by-time'

class Achievements extends Component {
  componentDidMount () {
    // remove new items badge from tabs when user navigates to achievements
    this.props.updateAchievementsMeta({ notificationCount: 0 })
  }

  aggregateAchievements = R.compose(
    R.mapObjIndexed((itemsInHistory) => {
      const verbCount = verb => R.compose(R.length, R.filter(R.propEq('verb', verb)))
      const creation = R.find(R.propEq('verb', 'create'))(itemsInHistory)
      const updates = R.filter(R.propEq('verb', 'update'))(itemsInHistory)
      return {
        history: [ creation, ...updates ],
        confirmsCount: verbCount('confirm')(itemsInHistory),
        depositsCount: verbCount('deposit')(itemsInHistory),
        supportsCount: verbCount('support')(itemsInHistory)
      }
    }),
    R.mapObjIndexed(sortByTime.asc),
    R.groupBy(R.prop('wallet'))
  )

  render () {
    const { achievementsData, createAchievement, isFacebookAuthenticated, isWalletReady, updateAchievement } = this.props
    const aggregatedAchievements = this.aggregateAchievements(achievementsData)
    const canCreateOrUpdate = isWalletReady && isFacebookAuthenticated
    return [
      <Grid
        key='list'
        container
        spacing={24}
        justify="center"
        alignContent="center"
      >
        {canCreateOrUpdate &&
          <Grid item xs={12}>
            <Create onCreate={createAchievement} />
            <Update onUpdate={updateAchievement} />
          </Grid>
        }
        {R.keys(aggregatedAchievements).length > 0
          ? R.keys(aggregatedAchievements).map((key, idx) => (
            <Grid key={idx} item xs={12}>
              <Achievement achievement={aggregatedAchievements[key]} />
            </Grid>
          ))
          : (
            <Grid key='no-item' item xs={12}>
              <Typography color="textPrimary">No achievement</Typography>
            </Grid>
          )
        }
      </Grid>
    ]
  }
}

Achievements.propTypes = {
  achievementsData: T.array,
  createAchievement: T.func,
  isFacebookAuthenticated: T.bool,
  isWalletReady: T.bool,
  updateAchievement: T.func,
  updateAchievementsMeta: T.func
}

export default withContainer(Achievements)