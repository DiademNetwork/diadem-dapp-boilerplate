import React from 'react'
import { PropTypes as T } from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

const UserItem = ({ classes, user }) => {
  const { userAccount, userName } = user
  return (
    <ListItem>
      <Avatar><PermIdentityIcon /></Avatar>
      <ListItemText primary={[
        <Typography color="textSecondary" key='time'>
          <a className={classes.link} href={`https://www.facebook.com/profile.php?id=${userAccount}`} target="_blank">see facebook profile</a>
        </Typography>,
        <Typography key='text'>
          {userName}
        </Typography>
      ]} />
    </ListItem>
  )
}

UserItem.propTypes = {
  classes: T.object,
  user: T.object
}

export default withStyles(styles)(UserItem)
