import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Achievement from './Achievement'

const styles = (theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing.unit * 7} !important`
    }
  }
})

const AchievementsList = ({ classes, list: { list }, noAchievementText }) => (
  <Grid
    key='list'
    container
    className={classes.grid}
    spacing={16}
  >
    <Grid key='no-item' item xs={12}>
      {list.length > 0 ? (
        list.map((achievement, idx) => (
          <Achievement
            achievement={achievement}
            key={idx}
            idx={idx}
          />
        ))
      ) : (
        <Card>
          <CardContent>
            <Typography color="textPrimary">{noAchievementText}</Typography>
          </CardContent>
        </Card>
      )}
    </Grid>
  </Grid>
)

AchievementsList.propTypes = {
  noAchievementText: T.string,
  classes: T.object,
  list: T.object
}

export default R.compose(
  withStyles(styles)
)(AchievementsList)
