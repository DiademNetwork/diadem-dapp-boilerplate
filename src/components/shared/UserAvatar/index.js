import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import user from './user.png'

const styles = (theme) => ({
  img: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

const UserAvatar = ({ actor, classes, className, pictureUrl }) => (
  <Avatar
    className={`${className} ${classes.img}`} alt="Profile picture"
    key="login-userPicture"
    src={
      pictureUrl || (R.path(['data', 'userPictureUrl'])(actor)) || user
    }
  />
)

UserAvatar.propTypes = {
  actor: T.oneOfType([T.object, T.string]),
  classes: T.object,
  className: T.string,
  pictureUrl: T.string
}

export default R.compose(
  withStyles(styles)
)(UserAvatar)
