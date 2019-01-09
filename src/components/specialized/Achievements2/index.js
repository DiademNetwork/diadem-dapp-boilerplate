import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing.unit * 7} !important`
    }
  }
})

const Achievements = ({
  className,
  classes
}) => (
  <Grid
    key='list'
    container
    className={`${className}  ${classes.grid}`}
    spacing={16}
  >
    <Grid key='no-item' item xs={12}>
      <Card>
        <CardContent>
          <Typography color="textPrimary">No achievements</Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)

Achievements.propTypes = {
  classes: T.object,
  className: T.string
}

export default R.compose(
  withStyles(styles)
)(Achievements)
