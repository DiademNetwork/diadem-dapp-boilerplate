import React from 'react'
import { PropTypes as T } from 'prop-types'
import UserName from 'components/shared/UserName'
import UserAvatar from 'components/shared/UserAvatar'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

const TimelineItem = ({ classes, item }) => {
  const { actor, verb, object, time, title } = item
  let mainText
  const formattedTime = moment.utc(time).from(moment.utc(new Date()))
  const nameDisplay = <UserName actor={actor} />
  const achievementLink = <a className={classes.link} href={object} target="_blank">{title}</a>
  switch (verb) {
    case 'create':
      mainText = (<Typography key='text'>{nameDisplay} created achievement: {achievementLink}</Typography>)
      break
    case 'update':
      mainText = (<Typography key='text'>{nameDisplay} updated {achievementLink}</Typography>)
      break
    case 'support':
      mainText = (<Typography key='text'>{nameDisplay} supported {achievementLink}</Typography>)
      break
    case 'deposit':
      mainText = (<Typography key='text'>{nameDisplay} deposited for {achievementLink} with witness</Typography>)
      break
    case 'confirm':
      mainText = (<Typography key='text'>{nameDisplay} confirmed {achievementLink}</Typography>)
      break
    case 'register':
      mainText = (<Typography key='text'>{nameDisplay} registered with address {object}</Typography>)
      break
    case 'withdraw':
    default:
      mainText = (<Typography key='text'>{nameDisplay} withdraw</Typography>)
  }
  return (
    <ListItem>
      <UserAvatar actor={actor} />
      <ListItemText primary={[
        <Typography color="textSecondary" key='time'>{formattedTime}</Typography>,
        mainText
      ]} />
    </ListItem>
  )
}

TimelineItem.propTypes = {
  classes: T.object,
  item: T.object
}

export default withStyles(styles)(TimelineItem)
