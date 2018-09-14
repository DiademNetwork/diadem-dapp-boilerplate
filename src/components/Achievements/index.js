import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Achievement from './Achievement'
import withContainer from './container'
import Create from './Create'
import Update from './Update'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  achievementButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      bottom: 0,
      right: 0,
      left: 0,
      width: '100vw',
      borderRadius: 'initial'
    }
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
      canUserConfirmCreateUpdateSupportDeposit,
      className,
      classes,
      createAchievement,
      createAchievementStatus,
      previousLinkOfUserAchievementOrNull,
      updateAchievement
    } = this.props
    console.log({ achievements })
    const displayUpdateButton = canUserConfirmCreateUpdateSupportDeposit && previousLinkOfUserAchievementOrNull
    const displayCreateButton = canUserConfirmCreateUpdateSupportDeposit && !previousLinkOfUserAchievementOrNull && createAchievementStatus !== 'succeeded'
    return [
      displayUpdateButton && (
        <Update
          className={classes.achievementButton}
          key="update"
          onUpdate={updateAchievement}
          previousLink={previousLinkOfUserAchievementOrNull} // will always be string in this case
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
        className={className}
        spacing={8}
      >
        {R.keys(achievements).length > 0
          ? R.keys(achievements).map((key, idx) => (
            <Grid key={idx} item xs={12}>
              <Achievement achievement={achievements[key]} />
            </Grid>
          ))
          : (
            <Grid key='no-item' item xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary">No achievement</Typography>
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
  achievements: T.object,
  canUserConfirmCreateUpdateSupportDeposit: T.bool,
  className: T.string,
  classes: T.object,
  createAchievement: T.func,
  createAchievementStatus: T.string,
  previousLinkOfUserAchievementOrNull: T.string,
  updateAchievement: T.func,
  updateAchievementsMeta: T.func
}

export default withContainer(withStyles(styles)(Achievements))
