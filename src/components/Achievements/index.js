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
  componentDidMount () {
    this.props.fetchAchievements()
  }

  extractCreatedAchievements = R.compose(
    R.reduce((acc, curr) => ({ ...acc, [curr.object]: curr }), {}),
    R.reduce(R.concat, []),
    R.map(R.prop('activities')),
    R.filter(R.propEq('group', 'create'))
  )

  aggregate = (singular, plural) => achievementsData => createdAchievements => {
    return R.keys(createdAchievements).reduce((acc, curr) => {
      const actions = R.compose(
        R.reduce(R.concat, []),
        R.map(R.prop('activities')),
        R.filter(R.propEq('group', `${singular}_${curr}`))
      )(achievementsData)
      return {
        ...acc,
        [curr]: {
          ...createdAchievements[curr],
          [plural]: actions
        }
      }
    }, {})
  }

  handleCreateAchievement = ({ link, title }) => {
    this.props.createAchievement({ link, title })
  }

  handleUpdateAchievement = ({ link, previousLink, title }) => {
    this.props.updateAchievement({ link, previousLink, title })
  }

  render () {
    const { achievementsData, isFacebookAuthenticated, isWalletReady } = this.props
    const achievements = R.compose(
      this.aggregate('confirm', 'confirms')(achievementsData),
      this.aggregate('reward', 'rewards')(achievementsData),
      this.extractCreatedAchievements
    )(achievementsData)
    const achievementsNames = R.keys(achievements)
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
            <Create onCreate={this.handleCreateAchievement} />
            <Update onUpdate={this.handleUpdateAchievement} />
          </Grid>
        }
        {!canCreateOrUpdate &&
          <Grid item xs={12}>
            <Button disabled variant="contained">Create/Update Achievement needs Facebook login and wallet ready</Button>
          </Grid>
        }
        {achievementsNames.length > 0
          ? achievementsNames.map((name, idx) => (
            <Grid key={idx} item xs={12}>
              <Achievement achievement={achievements[name]} />
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
  fetchAchievements: T.func,
  isFacebookAuthenticated: T.bool,
  isWalletReady: T.bool,
  updateAchievement: T.func
}

export default withContainer(Achievements)
