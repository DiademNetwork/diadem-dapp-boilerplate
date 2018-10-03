import React from 'react'
import { PropTypes as T } from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined'

const UserItem = ({ user: { userAccount, userName } }) => (
  <ListItem>
    <Avatar><PermIdentityIcon /></Avatar>
    <ListItemText primary={[
      <Typography color="textSecondary" key='time'>
        {userAccount}
      </Typography>,
      <Typography key='text'>
        {userName}
      </Typography>
    ]} />
  </ListItem>
)

UserItem.propTypes = {
  user: T.object
}

export default UserItem
