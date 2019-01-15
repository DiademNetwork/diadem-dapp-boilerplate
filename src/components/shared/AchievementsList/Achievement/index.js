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
import * as U from 'utils'

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

const Achievement = ({
  classes,
  achievement,
  idx,
  userAddress
}) => {
  const { actor: creator, title, object } = U.achievement.getActivities('create')(achievement)
  const confirmActivities = U.achievement.getActivities('confirm')(achievement)
  const supportActivities = U.achievement.getActivities('support')(achievement)
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
        subheader={<Typography key="achievement-creator" variant="subheading" color="textSecondary">Created by <UserName actor={creator} /></Typography>}
      />
      <Divider />
      <CardContent>
        {confirmActivities.length > 0 && (
          <Typography>
            {`This achievement has been confirmed by ${U.actor.getUserName(U.achievement.firstActor('confirm')(achievement))}${confirmActivities.length - 1 > 0 ? `and ${confirmActivities.length - 1} other people.` : ''}`}
          </Typography>
        )}
        {supportActivities.length > 0 && (
          <Typography>
            {`This achievement has been supported by ${U.actor.getUserName(U.achievement.firstActor('support')(achievement))}${supportActivities.length - 1 > 0 ? `and ${supportActivities.length - 1} other people.` : ''}`}
          </Typography>
        )}
      </CardContent>
      <CardActions
        className={classes.actions}
        disableActionSpacing
      >
        {U.achievement.isCreator(userAddress)(achievement) ? (
          <Typography>This is your achievement</Typography>
        ) : (
          <Fragment>
            <Confirm key='confirm' achievement={achievement} idx={idx} />
            <Support key='support' achievement={achievement} idx={idx} />
          </Fragment>
        )}
      </CardActions>
    </Card>
  )
}

Achievement.propTypes = {
  achievement: T.object,
  classes: T.object,
  idx: T.number,
  userAddress: T.string
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(Achievement)
