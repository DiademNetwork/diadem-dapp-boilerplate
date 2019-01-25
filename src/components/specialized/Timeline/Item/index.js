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

const TimelineItem = ({ classes, item: { actor, verb, object, time, title } }) => (
  <ListItem>
    <UserAvatar actor={actor} />
    <ListItemText primary={[
      <Typography color="textSecondary" key='time'>{moment.utc(time).from(moment.utc(new Date()))}</Typography>,
      (function getMainText () {
        const achievementLink = <a className={classes.link} href={object} target="_blank">{title || 'achivement'}</a>
        switch (verb) {
          case 'create':
            return (<Typography key='text'><UserName actor={actor} /> created {achievementLink}</Typography>)
          case 'support':
            return (<Typography key='text'><UserName actor={actor} /> supported {achievementLink}</Typography>)
          case 'confirm':
            return (<Typography key='text'><UserName actor={actor} /> confirmed {achievementLink}</Typography>)
          default:
            return null
        }
      })()
    ]} />
  </ListItem>
)

TimelineItem.propTypes = {
  classes: T.object,
  item: T.object
}

export default withStyles(styles)(TimelineItem)
