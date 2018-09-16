import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Tooltip from '@material-ui/core/Tooltip'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const styles = (theme) => ({
  help: {
    cursor: 'pointer',
    margin: `${theme.spacing.unit * 2} 0 ${theme.spacing.unit}`
  }
})

const FacebookLinkHelp = ({ classes, fullScreen }) => fullScreen ? (
  <Typography variant="caption" color="secondary">
    `To get your facebook post link, click on time just below your name on your facebook post to access to your post URL. Copy all link before "?"`
  </Typography>
) : (
  <Tooltip
    TransitionComponent={Zoom}
    title={`Click on time just below your name on your facebook post to access to your post URL. Copy all link before "?"`}
  >
    <Typography
      className={classes.help}
      color="secondary"
      variant="body2"
    >
      How to get your facebook link?
    </Typography>
  </Tooltip>
)

FacebookLinkHelp.propTypes = {
  classes: T.object,
  fullScreen: T.bool
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles)
)(FacebookLinkHelp)
