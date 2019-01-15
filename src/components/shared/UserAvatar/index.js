import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  img: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

const Username = ({ actor, classes }) => (
  <Avatar
    className={classes.img} alt="Profile picture"
    key="login-userPicture"
    src={R.path(['data', 'userPictureUrl'])(actor)}
  />
)

Username.propTypes = {
  classes: T.object,
  actor: T.object
}

export default R.compose(
  withStyles(styles)
)(Username)
