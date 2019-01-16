import React, { Fragment } from 'react'
import * as R from 'ramda'
import withContainer from './container'
import { withStyles } from '@material-ui/core/styles'
import { PropTypes as T } from 'prop-types'
import UserAvatar from 'components/shared/UserAvatar'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  }
})

const LoginUser = ({ userName, userPictureUrl, classes }) => (
  <Fragment>
    <UserAvatar
      className={classes.img}
      key="login-userPicture"
      pictureUrl={userPictureUrl}
    />
    {userName}
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
