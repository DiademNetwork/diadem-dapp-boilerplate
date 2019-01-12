import React, { Component, Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Hidden from '@material-ui/core/Hidden'
import DoneIcon from '@material-ui/icons/Done'
import Link from 'components/shared/Link'
import network from 'configurables/network'
import * as R from 'ramda'
import withContainer from './container'

class AchievementConfirm extends Component {
  state = {
    modalOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  hasUserAlreadyConfirmed = R.ifElse(
    R.isNil,
    R.F,
    R.compose(
      R.contains(this.props.userID),
      R.map(R.prop('actor'))
    )
  )

  handleConfirm = () => {
    const { accessToken, confirmAchievement, currentAchievement, userID, walletAddress } = this.props
    confirmAchievement({
      address: walletAddress,
      link: currentAchievement.object,
      token: accessToken,
      user: userID
    })
    this.handleClose()
  }

  render () {
    const {
      canPerformActions,
      className,
      currentAchievement,
      fullScreen,
      idx,
      link,
      title
    } = this.props
    const { modalOpen } = this.state
    const { name: creatorName } = currentAchievement
    const hadConfirmedAlready = this.hasUserAlreadyConfirmed(currentAchievement.confirm)
    return (
      <Fragment>
        <Button
          aria-label="Confirm"
          color="secondary"
          className={className}
          data-qa-id={`achievement-${idx}-confirm-button`}
          key='achievement-confirm-button'
          disabled={hadConfirmedAlready}
          onClick={this.handleClickOpen}
          variant={fullScreen ? 'contained' : 'extendedFab'}
        >
          <Hidden smDown>
            <DoneIcon />
          </Hidden>
          {hadConfirmedAlready ? 'You confirmed already' : 'Confirm'}
        </Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          data-qa-id={`achievement-${idx}-confirm-modal`}
          fullScreen={fullScreen}
          key='achievement-confirm-modal'
          open={modalOpen}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <Typography paragraph variant="body1">
                Has {creatorName} really done achievement?<br /><br />
                {title}
              </Typography>
              <Link
                text={`View achievement post on ${network.name} again`}
                href={link}
                typographyProps={{
                  paragraph: true
                }}
              />
              <Typography variant="caption" color="textSecondary">
                Confirmations make other Diadem Network users know they support real achievement(s)<br />
                Please confirm only achievement(s) you are sure of
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              data-qa-id={`achievement-${idx}-confirm-cancel-button`}
              onClick={this.handleClose}
            >
              I'm not sure
            </Button>
            <Button
              color="secondary"
              data-qa-id={`achievement-${idx}-confirm-submit-button`}
              onClick={this.handleConfirm}
              variant="contained"
            >
              yes, {creatorName} has!
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AchievementConfirm.propTypes = {
  accessToken: T.string,
  confirmAchievement: T.func,
  currentAchievement: T.object,
  canPerformActions: T.bool,
  className: T.string,
  fullScreen: T.bool,
  idx: T.number,
  link: T.string,
  title: T.string,
  userID: T.string,
  walletAddress: T.string
}

export default R.compose(
  withMobileDialog(),
  withContainer
)(AchievementConfirm)
