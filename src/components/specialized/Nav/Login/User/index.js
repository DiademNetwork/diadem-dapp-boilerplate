import React, { Fragment } from 'react'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import withContainer from './container'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'
import { PropTypes as T } from 'prop-types'

const styles = (theme) => ({
  img: {
    marginRight: theme.spacing.unit * 2
  }
})

const LoginUser = ({ userName, userPictureUrl, classes }) => (
  <Fragment>
    <Avatar
      className={classes.img} alt="Profile picture"
      key="login-user-avatar"
      src={userPictureUrl}
    />
    <Hidden key="login-user-username" smDown>
      <Typography
        data-qa-id="login-user-name"
        key="username"
        variant="title"
        color="inherit"
      >
        {userName}
      </Typography>
    </Hidden>
  </Fragment>
)

LoginUser.propTypes = {
  classes: T.object,
  userName: T.string,
  userPictureUrl: T.string
}

export default R.compose(
  withStyles(styles),
  withContainer
)(LoginUser)
