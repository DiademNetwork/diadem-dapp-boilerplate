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
      isFacebookAuthenticated,
      link,
      name,
      title
    } = this.props
    const { modalOpen } = this.state
    return [
      <Button
        color="secondary"
        className={className}
        key='achievement-confirm-button'
        disabled={!isFacebookAuthenticated || actionAlreadyDone}
        onClick={this.handleClickOpen}
        variant="contained"
      >
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
              Has {name} really done achievement?<br /><br />
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
            yes, {name} has!
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
  isFacebookAuthenticated: T.bool,
  link: T.string,
  name: T.string,
  onConfirm: T.func,
  title: T.string
}

export default withMobileDialog()(AchievementConfirm)
