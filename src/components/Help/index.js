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
import withContainer from './container'

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
    const { isHelpDisplayed } = this.props
    return (
      <Dialog
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
            <Typography paragraph color="textPrimary">
              This networks (for facebook only for now) aims to connect users achieving great things with people wanting to support them
            </Typography>
            <Typography color="textSecondary">
              CREATE AN ACHIEVEMENT (1max per user): Post a link to an achievement you already posted on facebook
            </Typography>
            <Typography color="textSecondary">
              UPDATE YOUR ACHIEVEMENT: Your achievement evolved? No problem! Available only if you have an achievement created
            </Typography>
            <Typography color="textSecondary">
              CONFIRM ACHIEVEMENT(S): Confirm other user(s) achievement(s). It's free!
            </Typography>
            <Typography color="textSecondary">
              SUPPORT ACHIEVEMENT(S): Send QTUM token to achievers to show them some love.
            </Typography>
            <Typography paragraph color="textSecondary">
              DEPOSIT FOR ACHIEVEMENT(S): Deposit QTUM tokens which will not be sent until the facebook user YOU chose confirms the achievement
            </Typography>
            <Typography variant="body2">
              Facebook Login is required to perform most actions
            </Typography>
            <Typography variant="body2">
              A hot wallet is used to manage QTUM transactions
            </Typography>
            <Typography paragraph variant="body2">
              Support and Deposit need a positive balance to be used
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
            color="secondary"
            onClick={this.handleClose}
            variant="contained"
          >
            Get me to Diadem Network
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Help.propTypes = {
  isHelpDisplayed: T.bool,
  hideHelp: T.func
}

export default withContainer(Help)
