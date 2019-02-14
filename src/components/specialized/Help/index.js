import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import withContainer from './container'
import network from 'configurables/network'

const styles = (theme) => ({
  divider: {
    marginBottom: theme.spacing.unit * 2
  },
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
    wantsNotToShowSplashAgain: false
  }

  handleOpen = () => this.props.toggleHelp({ helpDisplay: 'help' })

  handleClose = () => this.props.toggleHelp({ helpDisplay: 'none' })

  handleCheckboxChange = event => {
    const checked = event.target.checked
    if (checked) {
      window.localStorage.setItem('do-not-show-splash', true)
    } else {
      window.localStorage.removeItem('do-not-show-splash')
    }
    this.setState({ wantsNotToShowSplashAgain: checked })
  }

  render () {
    const { wantsNotToShowSplashAgain } = this.state
    const { classes, fullScreen, helpDisplay } = this.props
    return (
      <Dialog
        data-qa-id="help-modal"
        fullScreen={fullScreen}
        open={helpDisplay !== 'none'}
        onClose={this.handleClose}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {helpDisplay === 'welcome' ? 'Welcome to Diadem Network!' : 'Help'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="div" id="alert-dialog-description">
            <Typography paragraph color="textPrimary">
              Diadem Network leverages blockchain technology from Blockchains and <a className={classes.link} target="_target" href={network.urls.website}>{network.name}</a>. You can be an achiever and/or a sponsor.
            </Typography>
            <Divider className={classes.divider} />
            <Typography color="textPrimary" variant="h6">
              Achiever
            </Typography>
            <Typography paragraph variant="body1">
              Fighting for the planet? Helping people out? But you need a boost? Get financial support using Diadem Network!
            </Typography>
            <Typography variant="subtitle1">
              1. Publish a {network.name} post explaining your achievement (with text, picture(s), video(s)).
            </Typography>
            <Typography variant="subtitle1">
              2. CREATE YOUR ACHIEVEMENT on Diadem Network with the link to your {network.name} post.
            </Typography>
            <Typography variant="subtitle1" paragraph>
              3. WITHDRAW QTUM tokens you receive from others supporting your great actions!
            </Typography>
            <Typography paragraph variant="subtitle1">
              Note you can UPDATE YOUR ACHIEVEMENT if it evolves. Available only if you created one.
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6">
              Sponsor
            </Typography>
            <Typography paragraph variant="body1">
              You want to financially support people helping the world?
            </Typography>
            <Typography variant="subtitle1">
              - CONFIRM achievements you know are real.
            </Typography>
            <Typography variant="subtitle1">
              - You want to give immediate SUPPORT ? You can send QTUM tokens right away.
            </Typography>
            <Typography paragraph variant="subtitle1">
              - You prefer waiting for someone you choose to confirm the achievement ? Then DEPOSIT QTUM tokens. They will not be transferred until he does.
            </Typography>
            <Divider className={classes.divider} />
            <Typography color="textSecondary">
              - {network.name} Login will make it possible to display your name and avatar instead of primary wallet address.
            </Typography >
            <Typography color="textSecondary">
              - Adblockers seems to cause a login bug. Please desactivate them to use DiademNetwork.
            </Typography >
            <Typography color="textSecondary">
              - A hot wallet is used to manage QTUM transactions.
            </Typography>
            <Typography color="textSecondary">
              - Please do not use hot wallet to store large amount of QTUM tokens.
            </Typography>
            <Typography color="textSecondary">
              - Creating, Updating and Confirming achievements are free.
            </Typography>
            <Typography color="textSecondary">
              - Supporting, Depositing and Withdrawing require QTUM tokens.
            </Typography>
            <Typography color="textSecondary">
              - <a className={classes.link} target="_target" href="https://docs.qtum.site/en/">Check official QTUM user guide here</a> to know how to send QTUM tokens to your hot wallet.
            </Typography>
            <Typography color="textSecondary" paragraph>
              - NEVER EVER lose privateKey/mnemonic you are given at first login. If you lose it, you lose funds inside.
            </Typography>
            <Typography paragraph variant="h6">
              #diademnetwork
            </Typography>
            <Typography variant="caption">
              If you need more help, have questions, improvements ideas, or just want to say hello, don't hesitate contacting us at: <a className={classes.link} target="_blank" href={`mailto:${process.env.SUPPORT_CONTACT_EMAIL}`}>{process.env.SUPPORT_CONTACT_EMAIL}</a>
            </Typography>
            {helpDisplay === 'welcome' && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    data-qa-id="help-do-not-show-checkbox"
                    checked={wantsNotToShowSplashAgain}
                    onChange={this.handleCheckboxChange}
                  />
                }
                label="I do not want to see this help again in the future"
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="Go to application"
            color="secondary"
            onClick={this.handleClose}
          >
            {helpDisplay === 'welcome' ? ' Go to Diadem Network' : 'Back to Diadem Network'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Help.propTypes = {
  classes: T.object,
  fullScreen: T.bool,
  helpDisplay: T.string,
  toggleHelp: T.func
}

export default R.compose(
  withMobileDialog(),
  withContainer,
  withStyles(styles)
)(Help)
