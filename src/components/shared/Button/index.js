import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit
  }
})

const DiademButton = ({ classes, icon, children, ...props }) => (
  <Button {...props}>
    {icon && <Hidden smDown><span className={classes.icon}>{icon}</span></Hidden>}
    {children}
  </Button>
)

DiademButton.defaultProps = {
  color: 'secondary',
  size: 'medium'
}

DiademButton.propTypes = {
  classes: T.object,
  children: T.node,
  icon: T.node
}

export default R.compose(
  withStyles(styles)
)(DiademButton)
