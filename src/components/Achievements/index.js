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

class Achievements extends Component {
  componentDidMount () {
    // remove new items badge from tabs when user navigates to achievements
    this.props.updateAchievementsMeta({ notificationCount: 0 })
  }

  render () {
    const {
      achievements,
      canCreateOrUpdateAchievement,
      createAchievement,
      hasUserCreatedAnAchievement,
      updateAchievement
    } = this.props
    return [
      <Grid
        key='list'
        container
        spacing={24}
        justify="center"
        alignContent="center"
      >
        {canCreateOrUpdateAchievement &&
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
  canCreateOrUpdateAchievement: T.bool,
  createAchievement: T.func,
  hasUserCreatedAnAchievement: T.bool,
  updateAchievement: T.func,
  updateAchievementsMeta: T.func
}

export default withContainer(Achievements)
