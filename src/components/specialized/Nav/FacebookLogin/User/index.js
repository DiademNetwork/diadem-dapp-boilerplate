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

const FacebookLoginUser = ({ facebookName, facebookPictureUrl, classes }) => (
  <Fragment>
    <Avatar
      className={classes.img} alt="Facebook profile picture"
      key="facebook-login-user-avatar"
      src={facebookPictureUrl}
    />,
    <Hidden key="facebook-login-user-username" smDown>
      <Typography
        data-qa-id="facebook-login-user-name"
        key="username"
        variant="title"
        color="inherit"
      >
        {facebookName}
      </Typography>
    </Hidden>
  </Fragment>
)

FacebookLoginUser.propTypes = {
  classes: T.object,
  facebookName: T.string,
  facebookPictureUrl: T.string
}

export default R.compose(
  withStyles(styles),
  withContainer
)(FacebookLoginUser)
