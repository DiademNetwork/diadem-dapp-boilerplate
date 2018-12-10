import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Hidden from '@material-ui/core/Hidden'

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: props.startsOpen
    }
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleConfirm = () => {
    const { onConfirm } = this.props
    if (onConfirm) { onConfirm() }
    this.handleClose()
  }

  render () {
    const {
      cancelButtonText,
      className,
      confirmButtonText,
      confirmButtonDisabled,
      disabled,
      fullScreen,
      icon,
      name,
      noCancelButton,
      openButtonText,
      maxWidth,
      render,
      title
    } = this.props
    const { modalOpen } = this.state
    return (
      <Fragment>
        <Button
          aria-label={name}
          color="secondary"
          className={className}
          data-qa-id={`${name}-open-button`}
          key={`${name}-button`}
          disabled={disabled}
          onClick={this.handleClickOpen}
          size="small"
          variant="contained"
        >
          {icon && <Hidden smDown>{icon}</Hidden>}
          {openButtonText}
        </Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          data-qa-id={`${name}-modal`}
          fullScreen={fullScreen}
          key={`${name}-modal`}
          open={modalOpen}
          onClose={this.handleClose}
          maxWidth={maxWidth}
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              {render({ fullScreen })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {!noCancelButton &&
              <Button
                color="primary"
                data-qa-id={`${name}-cancel-button`}
                onClick={this.handleClose}
              >
                {cancelButtonText}
              </Button>
            }
            <Button
              color="secondary"
              data-qa-id={`${name}-confirm-button`}
              disabled={confirmButtonDisabled}
              onClick={this.handleConfirm}
              variant="contained"
            >
              {confirmButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

Modal.defaultProps = {
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
  confirmButtonDisabled: false,
  disabled: false,
  maxWidth: 'sm',
  noCancelButton: false,
  startsOpen: false
}

Modal.propTypes = {
  cancelButtonText: T.string,
  className: T.string,
  confirmButtonText: T.string,
  confirmButtonDisabled: T.bool,
  disabled: T.bool,
  fullScreen: T.bool,
  icon: T.node,
  startsOpen: T.bool,
  maxWidth: T.string,
  name: T.string,
  onConfirm: T.func,
  noCancelButton: T.bool,
  openButtonText: T.string,
  render: T.func,
  title: T.string
}

export default R.compose(
  withMobileDialog()
)(Modal)
