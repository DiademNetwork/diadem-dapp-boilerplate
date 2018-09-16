import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Link from '../../Link'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Hidden from '@material-ui/core/Hidden'
import DoneIcon from '@material-ui/icons/Done'

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

  handleConfirm = () => {
    const { onConfirm } = this.props
    onConfirm && onConfirm()
    this.handleClose()
  }

  render () {
    const {
      actionAlreadyDone,
      className,
      fullScreen,
      canUserConfirmCreateUpdateSupportDeposit,
      link,
      creatorName,
      title
    } = this.props
    const { modalOpen } = this.state
    return [
      <Button
        aria-label="Confirm"
        color="secondary"
        className={className}
        key='achievement-confirm-button'
        disabled={!canUserConfirmCreateUpdateSupportDeposit || actionAlreadyDone}
        onClick={this.handleClickOpen}
        variant={fullScreen ? 'contained' : 'extendedFab'}
      >
        <Hidden smDown>
          <DoneIcon />
        </Hidden>
        {actionAlreadyDone ? 'You confirmed already' : 'Confirm'}
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key='achievement-confirm-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography paragraph variant="body1">
              Has {creatorName} really done achievement?<br /><br />
              {title}
            </Typography>
            <Link
              text="View achievement Facebook post again"
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
          <Button onClick={this.handleClose} color="primary">
            I'm not sure
          </Button>
          <Button
            onClick={this.handleConfirm}
            variant="contained"
            color="secondary"
          >
            yes, {creatorName} has!
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

AchievementConfirm.propTypes = {
  actionAlreadyDone: T.bool,
  className: T.string,
  fullScreen: T.bool,
  canUserConfirmCreateUpdateSupportDeposit: T.bool,
  link: T.string,
  creatorName: T.string,
  onConfirm: T.func,
  title: T.string
}

export default withMobileDialog()(AchievementConfirm)
