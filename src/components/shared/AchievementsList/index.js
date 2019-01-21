import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Achievement from './Achievement'
import InfiniteScroll from 'react-infinite-scroller'

const styles = (theme) => ({
  grid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: `${theme.spacing.unit * 7} !important`
    }
  }
})

const AchievementsList = ({ classes, loadMore, list: { hasMore, list }, noAchievementText }) => (
  <Grid
    key='list'
    container
    className={classes.grid}
    spacing={16}
  >
    <Grid item xs={12}>
      {list.length > 0 ? (
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<Typography key={0}>Loading....</Typography>}
        >
          {list.map((achievement, idx) => (
            <Achievement
              achievement={achievement}
              key={idx}
              idx={idx}
            />
          ))}
        </InfiniteScroll>
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
  classes: T.object,
  list: T.object,
  loadMore: T.func,
  noAchievementText: T.string
}

export default R.compose(
  withStyles(styles)
)(AchievementsList)
