import React from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({
  help: {
    cursor: 'pointer',
    margin: `${theme.spacing.unit * 2} 0 ${theme.spacing.unit}`
  }
})

const FacebookLinkHelp = ({ classes }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title="On your facebook post, just click on time just below your name to access to your post URL. Use this URL for link field."
  >
    <Typography
      className={classes.help}
      color="secondary"
      variant="body2"
    >
      You can't find your facebook post link?
    </Typography>
  </Tooltip>
)

FacebookLinkHelp.propTypes = {
  classes: T.object
}

export default withStyles(styles)(FacebookLinkHelp)
