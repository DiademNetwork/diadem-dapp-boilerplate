import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
    const { className, isFacebookAuthenticated } = this.props
    const { modalOpen } = this.state
    return [
      <Button
        color="primary"
        className={className}
        key='achievement-confirm-button'
        disabled={!isFacebookAuthenticated}
        onClick={this.handleClickOpen}
        variant="contained"
      >
        {!isFacebookAuthenticated ? 'Confirm needs Facebook login' : 'Confirm'}
      </Button>,
      <Dialog
        key='achievement-confirm-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm this achievement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={this.handleConfirm}
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

AchievementConfirm.propTypes = {
  className: T.string,
  onConfirm: T.func,
  isFacebookAuthenticated: T.bool
}

export default AchievementConfirm
