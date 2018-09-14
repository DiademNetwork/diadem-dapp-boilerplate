import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import withContainer from './container'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import SendIcon from '@material-ui/icons/SendOutlined'

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

class Help extends Component {
  state = {
    open: false,
    wantsNotToShowSplashAgain: false
  }

  componentWillReceiveProps ({ isHelpDisplayed: newIsHelpDisplayed }) {
    const { isHelpDisplayed } = this.props
    if (newIsHelpDisplayed && newIsHelpDisplayed !== isHelpDisplayed) {
      this.handleOpen()
    }
  }

  componentDidMount () {
    const doNotShowSplash = window.localStorage.getItem('do-not-show-splash')
    if (!doNotShowSplash) {
      this.handleOpen()
    }
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => {
    this.setState({ open: false })
    setTimeout(this.props.hideHelp, 300) // TO DO: Improve system of helper (setTimeout can be avoided)
  }

  handleCheckboxChange = event => {
    const checked = event.target.checked
    checked
      ? window.localStorage.setItem('do-not-show-splash', true)
      : window.localStorage.removeItem('do-not-show-splash')
    this.setState({ wantsNotToShowSplashAgain: checked })
  }

  render () {
    const { open, wantsNotToShowSplashAgain } = this.state
    const { classes, fullScreen, isHelpDisplayed } = this.props
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isHelpDisplayed ? 'Help' : 'Welcome to Diadem Network!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <Typography paragraph color="textPrimary" variant="headline">
              Diadem Network leverages blockchain technology from <a className={classes.link} target="_target" href="https://qtum.org">QTUM</a> and <a className={classes.link} target="_target" href="https://www.facebook.com/">Facebook</a> to connect people improving the world by their actions to those willing to support them for it<br />
            </Typography>
            <Typography color="textSecondary">
              CREATE YOUR ACHIEVEMENT: Post a link to an achievement you already posted on facebook.
            </Typography>
            <Typography color="textSecondary">
              UPDATE YOUR ACHIEVEMENT: Your achievement evolved? No problem! Available only if you have an achievement created
            </Typography>
            <Typography color="textSecondary">
              CONFIRM achievement(s): Confirm other user(s) achievement(s)
            </Typography>
            <Typography color="textSecondary">
              SUPPORT achievement(s): Send QTUM token(s) to achievers to show them some love
            </Typography>
            <Typography color="textSecondary">
              DEPOSIT for achievement(s): Deposit QTUM token(s) which will not be sent until the facebook user YOU chose confirms the achievement
            </Typography>
            <Typography paragraph color="textSecondary">
              WITHDRAW your tokens: QTUM Tokens you own in your hot wallet can be withdrawn any time you want
            </Typography>
            <Typography variant="body2">
              Facebook Login is required to perform most actions
            </Typography>
            <Typography variant="body2">
              A hot wallet is used to manage QTUM transactions
            </Typography>
            <Typography variant="body2">
              You need to send QTUM tokens to Diadem Hot wallet to be able to Support and Deposit. <a className={classes.link} target="_target" href="https://docs.qtum.site/en/">Check official QTUM user guide here</a>
            </Typography>
            <Typography variant="body2">
              Create, Update and Confirm are free
            </Typography>
            <Typography variant="body2">
              Support, Deposit and Withdraw need QTUM token(s). For this, you must send some to your hot wallet
            </Typography>
            <Typography paragraph variant="body2">
              For non-free action, you will have to pay a little extra fee you cannot configure (for now)
            </Typography>
            <Typography paragraph variant="title">
              #diademnetwork
            </Typography>
            {!isHelpDisplayed &&
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={wantsNotToShowSplashAgain}
                  onChange={this.handleCheckboxChange}
                />
              }
              label="I do not want to see this help again in the future"
            />
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="Go to application"
            color="secondary"
            onClick={this.handleClose}
            variant="extendedFab"
          >
            <SendIcon className={classes.icon} /> {isHelpDisplayed ? 'Go back to Diadem Network' : ' Get me to Diadem Network'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Help.propTypes = {
  classes: T.object,
  fullScreen: T.bool,
  isHelpDisplayed: T.bool,
  hideHelp: T.func
}

export default withMobileDialog()(withContainer(withStyles(styles)(Help)))
