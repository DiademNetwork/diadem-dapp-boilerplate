import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Tooltip from '@material-ui/core/Tooltip'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import network from 'configurables/network'

const styles = (theme) => ({
  help: {
    cursor: 'pointer',
    margin: `${theme.spacing.unit * 2} 0 ${theme.spacing.unit}`
  }
})

const NetworkLinkHelp = ({ classes, fullScreen }) => fullScreen ? (
  <Typography
    variant="caption"
    color="secondary"
  >
    {network.texts.linkHelp}
  </Typography>
) : (
  <Tooltip
    TransitionComponent={Zoom}
    title={network.texts.linkHelp}
  >
    <Typography
      className={classes.help}
      color="secondary"
      variant="body1"
    >
      How to get the link of your {network.name} post?
    </Typography>
  </Tooltip>
)

NetworkLinkHelp.propTypes = {
  classes: T.object,
  fullScreen: T.bool
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles)
)(NetworkLinkHelp)
