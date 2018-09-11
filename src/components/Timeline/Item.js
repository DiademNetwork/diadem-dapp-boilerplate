import React from 'react'
import { PropTypes as T } from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PlusOneIcon from '@material-ui/icons/PlusOneOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined'
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

const TimelineItem = ({ classes, transaction }) => {
  const { actor, verb, object, target, time, name } = transaction
  let icon
  let achievementLink
  let verbDisplay
  const txComponent = <a className={classes.link} href={`${process.env.QTUM_INSIGHT_URL}/tx/${target}`} target="_blank">view qtum transaction on blockchain explorer</a>
  const formattedTime = moment(time).from(moment().utc())
  const actorDisplay = name || actor
  switch (verb) {
    case 'create':
      icon = <PlusOneIcon />
      achievementLink = <a className={classes.link} href={object} target="_blank">achievement</a>
      verbDisplay = 'created'
      break
    case 'confirm':
      icon = <ThumbUpIcon />
      achievementLink = <a className={classes.link} href={object} target="_blank">achievement</a>
      verbDisplay = 'confirmed'
      break
    case 'register':
      icon = <PermIdentityIcon />
      verbDisplay = 'registered with address'
      break
    case 'withdraw':
    default:
      icon = <RemoveIcon />
      achievementLink = <a className={classes.link} href={object} target="_blank">achievement</a>
      verbDisplay = 'withdrew'
  }
  return (
    <ListItem>
      <Avatar>{icon}</Avatar>
      <ListItemText primary={[
        <Typography color="textSecondary" key='time'>{formattedTime}</Typography>,
        <Typography key='text'>
          {actorDisplay} {verbDisplay} {achievementLink || object}
        </Typography>,
        <Typography key='tx'>{txComponent}</Typography>
      ]} />
    </ListItem>
  )
}

TimelineItem.propTypes = {
  classes: T.object,
  transaction: T.object
}

export default withStyles(styles)(TimelineItem)
