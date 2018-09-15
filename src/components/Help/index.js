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
import Hidden from '@material-ui/core/Hidden'
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
            <Typography paragraph color="textPrimary" variant="title">
              Diadem Network leverages blockchain technology from <a className={classes.link} target="_target" href="https://qtum.org">QTUM</a> and <a className={classes.link} target="_target" href="https://www.facebook.com/">Facebook</a> to connect people improving the world by their actions to those willing to support them for it<br />
            </Typography>
            <Typography variant="subheading">
              CREATE YOUR ACHIEVEMENT by posting a link to a facebook post for something you achieved
            </Typography>
            <Typography variant="subheading">
              UPDATE YOUR ACHIEVEMENT if it evolved. Available only if you created one
            </Typography>
            <Typography variant="subheading">
              CONFIRM other users achievements
            </Typography>
            <Typography variant="subheading">
              SUPPORT other users achievements with QTUM tokens to show them some love
            </Typography>
            <Typography variant="subheading">
              DEPOSIT QTUM tokens for other users achievements. Your deposit will not be sent until the facebook user YOU chose confirmed the achievement
            </Typography>
            <Typography variant="subheading" paragraph>
              WITHDRAW your QTUM tokens you received from others or sent yourselves, any time you want.
            </Typography>
            <Typography color="textSecondary">
              Facebook Login is required to perform most actions
            </Typography >
            <Typography color="textSecondary">
              A hot wallet is used to manage QTUM transactions
            </Typography>
            <Typography color="textSecondary">
              You need to send QTUM tokens to your Diadem Hot wallet to be able to Support and Deposit. <a className={classes.link} target="_target" href="https://docs.qtum.site/en/">Check official QTUM user guide here</a>
            </Typography>
            <Typography color="textSecondary">
              Create, Update and Confirm are free
            </Typography>
            <Typography color="textSecondary">
              Support, Deposit and Withdraw need QTUM tokens. For this, you must send some before to your hot wallet
            </Typography>
            <Typography color="textSecondary" paragraph>
              For non-free action, you will have to pay fees for blockchain miners, which you can configure
            </Typography>
            <Typography paragraph variant="title">
              #diademnetwork
            </Typography>
            <Typography variant="caption">
              If you need more help, have questions, improvements ideas, or just want to say hello to the team behind Diadem Network, don't hesitate contacting us at: <a className={classes.link} target="_blank" href={`mailto:${process.env.SUPPORT_CONTACT_EMAIL}`}>{process.env.SUPPORT_CONTACT_EMAIL}</a>
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
            variant={fullScreen ? 'contained' : 'extendedFab'}
          >
            <Hidden smDown>
              <SendIcon className={classes.icon} />
            </Hidden>
            {isHelpDisplayed ? 'Go back to Diadem Network' : ' Get me to Diadem Network'}
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
