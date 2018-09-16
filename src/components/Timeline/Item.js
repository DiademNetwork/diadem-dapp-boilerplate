import React from 'react'
import { PropTypes as T } from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import DoneIcon from '@material-ui/icons/Done'
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

const TimelineItem = ({ classes, transaction }) => {
  const { actor, verb, object, target, time, name, witnessName } = transaction
  let icon
  let mainText
  const txComponent = <a className={classes.link} href={`${process.env.QTUM_INSIGHT_URL}/tx/${target}`} target="_blank">view qtum transaction on blockchain explorer</a>
  const formattedTime = moment.utc(time).from(moment.utc(new Date()))
  const nameDisplay = name || actor
  const achievementLink = <a className={classes.link} href={object} target="_blank">achievement</a>
  switch (verb) {
    case 'create':
      icon = <StarIcon />
      mainText = (<Typography key='text'>{nameDisplay} created {achievementLink}</Typography>)
      break
    case 'update':
      icon = <StarIcon />
      mainText = (<Typography key='text'>{nameDisplay} updated {achievementLink}</Typography>)
      break
    case 'support':
      icon = <MoneyIcon />
      mainText = (<Typography key='text'>{nameDisplay} supported {achievementLink}</Typography>)
      break
    case 'deposit':
      icon = <VpnKeyOutlinedIcon />
      mainText = (<Typography key='text'>{nameDisplay} deposited for {achievementLink} with witness {witnessName}</Typography>)
      break
    case 'confirm':
      icon = <DoneIcon />
      mainText = (<Typography key='text'>{nameDisplay} confirmed {achievementLink}</Typography>)
      break
    case 'register':
      icon = <PermIdentityIcon />
      mainText = (<Typography key='text'>{nameDisplay} registered with address {object}</Typography>)
      break
    case 'withdraw':
    default:
      icon = <RemoveIcon />
      mainText = (<Typography key='text'>{nameDisplay} withdraw</Typography>)
  }
  return (
    <ListItem>
      <Avatar>{icon}</Avatar>
      <ListItemText primary={[
        <Typography color="textSecondary" key='time'>{formattedTime}</Typography>,
        mainText,
        txComponent && <Typography key='tx'>{txComponent}</Typography>
      ]} />
    </ListItem>
  )
}

TimelineItem.propTypes = {
  classes: T.object,
  transaction: T.object
}

export default withStyles(styles)(TimelineItem)
