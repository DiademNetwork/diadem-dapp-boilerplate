import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Achievement from './Achievement'
import withContainer from './container'
import Create from './Create'
import Update from './Update'

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit * 3
  }
})

class Achievements extends Component {
  componentDidMount () {
    // remove new items badge from tabs when user navigates to achievements
    this.props.updateAchievementsMeta({ notificationCount: 0 })
  }

  render () {
    const {
      achievements,
      classes,
      createAchievement,
      hasUserCreatedAnAchievement,
      isFacebookAuthenticated,
      isWalletReady,
      updateAchievement
    } = this.props
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
            {hasUserCreatedAnAchievement
              ? <Update onUpdate={updateAchievement} />
              : <Create onCreate={createAchievement} />
            }
          </Grid>
        }
        {R.keys(achievements).length > 0
          ? R.keys(achievements).map((key, idx) => (
            <Grid key={idx} item xs={12} lg={6}>
              <Achievement achievement={achievements[key]} />
            </Grid>
          ))
          : (
            <Grid key='no-item' item xs={12}>
              <Paper className={classes.paper} color="textPrimary">No achievement</Paper>
            </Grid>
          )
        }
      </Grid>
    ]
  }
}

Achievements.propTypes = {
  achievements: T.object,
  classes: T.object,
  createAchievement: T.func,
  hasUserCreatedAnAchievement: T.bool,
  isFacebookAuthenticated: T.bool,
  isWalletReady: T.bool,
  updateAchievement: T.func,
  updateAchievementsMeta: T.func
}

export default withContainer(withStyles(styles)(Achievements))
