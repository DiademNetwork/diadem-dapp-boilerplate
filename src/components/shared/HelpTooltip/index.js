import React from 'react'
import { PropTypes as T } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Zoom from '@material-ui/core/Zoom'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  icon: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
    marginLeft: theme.spacing.unit * 2,
    position: 'relative',
    top: '7px'
  }
})

const HelpTooltip = ({ classes, text }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title={text}
  >
    <HelpOutlineIcon className={classes.icon} />
  </Tooltip>
)

HelpTooltip.defaultProps = {
  classes: {}
}

HelpTooltip.propTypes = {
  classes: T.object,
  text: T.string
}

export default withStyles(styles)(HelpTooltip)
