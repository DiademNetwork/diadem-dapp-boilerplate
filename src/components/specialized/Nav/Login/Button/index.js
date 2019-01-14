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

const LoginButton = ({ classes, name, onClick }) => (
  <Button
    color="secondary"
    data-qa-id="login-button"
    onClick={onClick}
    variant="extendedFab"
  >
    Login<Hidden smDown> with {name}<PowerSettingsNewIcon className={classes.icon} /></Hidden>
  </Button>
)

LoginButton.propTypes = {
  classes: T.object,
  name: T.string,
  onClick: T.func
}

export default R.compose(
  withStyles(styles)
)(LoginButton)
