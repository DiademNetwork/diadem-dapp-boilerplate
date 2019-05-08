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
  const { actor: creator, title, object } = U.achievement.getReactions('create')(achievement)[0]
  const confirmReactions = U.achievement.getReactions('confirm')(achievement)
  const supportReactions = U.achievement.getReactions('support')(achievement)
  return (
    <Card
      className={classes.item}
      data-qa-id={`achievement-item-${idx}`}
      key="achievement-card"
    >
      <CardHeader
        avatar={<UserAvatar actor={creator} />}
        title={
          <Typography key="achievement-title" variant="h5">
            <Link
              className={classes.link}
              href={object}
              text={title}
              variant="h5"
            />
          </Typography>
        }
        subheader={<Typography key="achievement-creator" variant="subtitle1" color="textSecondary">Created by <UserName actor={creator} /></Typography>}
      />
      <Divider />
      <CardContent>
        {confirmReactions.length > 0 && (
          <Typography>
            {`This achievement has been confirmed by ${U.actor.getUserNameOrAddress(U.achievement.firstActor('confirm')(achievement))}${confirmReactions.length - 1 > 0 ? `and ${confirmReactions.length - 1} other people.` : ''}`}
          </Typography>
        )}
        {supportReactions.length > 0 && (
          <Typography>
            {`This achievement has been supported by ${U.actor.getUserNameOrAddress(U.achievement.firstActor('support')(achievement))}${supportReactions.length - 1 > 0 ? `and ${supportReactions.length - 1} other people.` : ''} for a total amount of ${U.achievement.getAmount('support')(achievement)}`}
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
            <Support key='support' achievement={achievement} idx={idx} />
            <Confirm key='confirm' achievement={achievement} idx={idx} />
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
