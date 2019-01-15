import React, { Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import Link from 'components/shared/Link'
import UserName from 'components/shared/UserName'
import UserAvatar from 'components/shared/UserAvatar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Confirm from './Confirm'
import Support from './Support'
import withContainer from './container'

const styles = (theme) => ({
  item: {
    marginBottom: theme.spacing.unit * 2
  },
  actions: {
    justifyContent: 'flex-end'
  },
  link: {
    marginBottom: theme.spacing.unit
  }
})

const getCreationActivity = R.compose(
  R.head,
  R.filter(R.propEq('verb', 'create'))
)

const getConfirmActivities = R.compose(
  R.filter(R.propEq('verb', 'confirm'))
)

const AchievementsListItem = ({
  classes,
  item,
  idx,
  userAddress
}) => {
  const { activities } = item
  const creationActivity = getCreationActivity(activities)
  const { actor: creator, title, object } = creationActivity
  return (
    <Card
      className={classes.item}
      data-qa-id={`achievement-item-${idx}`}
      key="achievement-card"
    >
      <CardHeader
        avatar={<UserAvatar actor={creator} />}
        title={
          <Typography key="achievement-title" variant="headline">
            <Link
              className={classes.link}
              href={object}
              text={title}
              variant="headline"
            />
          </Typography>
        }
        subheader={<Typography key="achievement-creator" variant="subheading" color="textSecondary">by <UserName actor={creator} /></Typography>}
      />
      <Divider />
      <CardContent>
        This achievement has been confirmed {getConfirmActivities(activities).length}
      </CardContent>
      <CardActions
        className={classes.actions}
        disableActionSpacing
      >
        {UserName.getUserAddress(creator) !== userAddress ? (
          <Fragment>
            <Confirm key='confirm' achievement={item} />
            <Support key='support' />
          </Fragment>
        ) : (
          <Typography>This is your achievement</Typography>
        )}
      </CardActions>
    </Card>
  )
}

AchievementsListItem.propTypes = {
  classes: T.object,
  idx: T.number,
  item: T.object,
  userAddress: T.string
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(AchievementsListItem)
