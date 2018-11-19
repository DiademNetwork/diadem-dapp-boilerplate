import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  icon: {
    marginLeft: theme.spacing.unit,
    marginRight: -theme.spacing.unit
  }
})

const FacebookLoginButton = ({ classes, onClick }) => (
  <Button
    color="secondary"
    data-qa-id="facebook-login-button"
    onClick={onClick}
    variant="contained"
  >
    Login<Hidden smDown> with facebook<PowerSettingsNewIcon className={classes.icon} /></Hidden>
  </Button>
)

FacebookLoginButton.propTypes = {
  classes: T.object,
  onClick: T.func
}

export default R.compose(
  withStyles(styles)
)(FacebookLoginButton)
