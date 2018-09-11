import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Achievement from './Achievement'
import withContainer from './container'
import Create from './Create'
import Update from './Update'

class Achievements extends Component {
  aggregateAchievements = R.compose(
    R.mapObjIndexed((itemsInHistory) => {
      const creation = R.find(R.propEq('verb', 'create'))(itemsInHistory)
      const updates = R.filter(R.propEq('verb', 'update'))(itemsInHistory)
      const deposits = R.filter(R.propEq('verb', 'deposit'))(itemsInHistory)
      const confirms = R.filter(R.propEq('verb', 'confirm'))(itemsInHistory)
      const supports = R.filter(R.propEq('verb', 'support'))(itemsInHistory)
      return {
        history: [ creation, ...updates ],
        confirmsCount: confirms.length,
        depositsCount: deposits.length,
        supportsCount: supports.length
      }
    }),
    R.mapObjIndexed((itemsInHistory) => itemsInHistory.sort((a, b) => new Date(a.time) - new Date(b.time))),
    R.groupBy(R.prop('wallet'))
  )

  render () {
    const { achievementsData, createAchievement, isFacebookAuthenticated, isWalletReady, updateAchievement } = this.props
    const aggregatedAchievements = this.aggregateAchievements(achievementsData)
    const canCreateOrUpdate = isWalletReady && isFacebookAuthenticated
    console.log({ aggregatedAchievements })
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
        {!canCreateOrUpdate &&
          <Grid item xs={12}>
            <Button disabled variant="contained">Create/Update Achievement needs Facebook login and wallet ready</Button>
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
  updateAchievement: T.func
}

export default withContainer(Achievements)
