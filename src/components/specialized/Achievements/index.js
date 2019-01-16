import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chain from './Chain'
import withContainer from './container'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing.unit * 7} !important`
    }
  }
})

const Achievements = ({
  achievements,
  className,
  classes,
  fetchStatus
}) => {
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
  className: T.string,
  classes: T.object,
  fetchStatus: T.string
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(Achievements)
