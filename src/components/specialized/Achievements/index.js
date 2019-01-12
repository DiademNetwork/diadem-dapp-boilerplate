import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chain from './Chain'
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

const Achievements = ({
  achievements,
  canPerformActions,
  className,
  classes,
  createAchievement,
  createAchievementStatus,
  fetchStatus,
  lastLinkOfUserAchievementOrNull,
  updateAchievement
}) => {
  const displayUpdateButton = canPerformActions && lastLinkOfUserAchievementOrNull
  const displayCreateButton = canPerformActions && !lastLinkOfUserAchievementOrNull && createAchievementStatus !== 'succeeded'
  return [
    <Grid
      key='list'
      container
      className={`${className}  ${classes.grid}`}
      spacing={16}
    >
      {R.keys(achievements).length > 0
        ? R.keys(achievements).map((key, idx) => (
          <Grid
            key={idx}
            item
            xs={12}
          >
            <Chain
              chain={achievements[key]}
              idx={idx}
            />
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

Achievements.propTypes = {
  achievements: T.object,
  canPerformActions: T.bool,
  className: T.string,
  classes: T.object,
  createAchievement: T.func,
  createAchievementStatus: T.string,
  fetchStatus: T.string,
  lastLinkOfUserAchievementOrNull: T.string,
  updateAchievement: T.func
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(Achievements)
