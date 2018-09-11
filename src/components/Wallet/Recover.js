import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class Recover extends Component {
  state = {
    open: true,
    mnemonic: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (name) => e => {
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = () => {
    this.props.onRecover(this.state.mnemonic)
    this.handleClose()
  }

  render () {
    return [
      <Button
        color="primary"
        key="button"
        onClick={this.handleClickOpen}
        variant="contained"
      >
        Recover your wallet
      </Button>,
      <Dialog
        key="dialog"
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recover your wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your mnemonic that were generated when first visit Diadem Network
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            onChange={this.handleChange('mnemonic')}
            id="mnemonic"
            label="Mnemonic"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleSubmit} color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

Recover.propTypes = {
  onRecover: T.func
}

export default Recover
