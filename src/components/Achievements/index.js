import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AchievementsChain from './AchievementsChain'
import withContainer from './container'
import Create from './Create'
import Update from './Update'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing.unit * 7} !important`
    }
  },
  achievementButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      bottom: 0,
      right: 0,
      left: 0,
      width: '100vw',
      borderRadius: 'initial',
      zIndex: 1000
    }
  }
})

class Achievements extends Component {
  componentDidMount () {
    const { fetchAchievements, fetchStatus, suscribeToAchievements } = this.props
    if (fetchStatus === 'none') {
      fetchAchievements()
      suscribeToAchievements()
    }
  }

  render () {
    const {
      achievementsChains,
      canUserConfirmCreateUpdateSupportDeposit,
      className,
      classes,
      createAchievement,
      createAchievementStatus,
      fetchStatus,
      lastLinkOfUserAchievementOrNull,
      updateAchievement
    } = this.props
    const displayUpdateButton = canUserConfirmCreateUpdateSupportDeposit && lastLinkOfUserAchievementOrNull
    const displayCreateButton = canUserConfirmCreateUpdateSupportDeposit && !lastLinkOfUserAchievementOrNull && createAchievementStatus !== 'succeeded'
    return [
      displayUpdateButton && (
        <Update
          className={classes.achievementButton}
          key="update"
          onUpdate={updateAchievement}
          previousLink={lastLinkOfUserAchievementOrNull} // will always be string in this case
        />
      ),
      displayCreateButton && (
        <Create
          key="create"
          className={classes.achievementButton}
          onCreate={createAchievement}
        />
      ),
      <Grid
        key='list'
        container
        className={`${className}  ${classes.grid}`}
        spacing={16}
      >
        {R.keys(achievementsChains).length > 0
          ? R.keys(achievementsChains).map((key, idx) => (
            <Grid key={idx} item xs={12}>
              <AchievementsChain achievementsChain={achievementsChains[key]} />
            </Grid>
          ))
          : (
            <Grid key='no-item' item xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary">{fetchStatus === 'requested' ? 'Loading...' : 'No achievements'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        }
      </Grid>
    ]
  }
}

Achievements.propTypes = {
  achievementsChains: T.object,
  canUserConfirmCreateUpdateSupportDeposit: T.bool,
  className: T.string,
  classes: T.object,
  createAchievement: T.func,
  createAchievementStatus: T.string,
  fetchAchievements: T.func,
  fetchStatus: T.string,
  suscribeToAchievements: T.func,
  lastLinkOfUserAchievementOrNull: T.string,
  updateAchievement: T.func
}

export default withContainer(withStyles(styles)(Achievements))
