import React, { Component } from 'react'
import * as R from 'ramda'
import { PrivateKey } from 'qtumcore-lib'
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
    mnemonic: '',
    privateKey: '',
    isMnemonicValid: false,
    isPrivateKeyValid: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (name) => e => {
    const value = e.target.value
    if (name === 'mnemonic') {
      const isMnemonicValid = this.isMnemonicValid(value)
      this.setState({ mnemonic: value, isMnemonicValid })
    } else if (name === 'privateKey') {
      const isPrivateKeyValid = PrivateKey.isValid(value)
      this.setState({ privateKey: value, isPrivateKeyValid })
    }
  }

  handleSubmit = () => {
    this.props.onRecover(this.state.mnemonic)
    this.handleClose()
  }

  is12WordsLong = R.compose(
    R.equals(12),
    R.length,
    R.split(' '),
    R.trim
  )

  isOnlyAlphaNumeric = R.test(/^\w+$/)

  isMnemonicValid = R.allPass([
    R.is(String),
    this.is12WordsLong
  ])

  render () {
    const { open, mnemonic, privateKey, isMnemonicValid, isPrivateKeyValid } = this.state
    const isFormValid = isMnemonicValid || isPrivateKeyValid
    return [
      <Button
        color="secondary"
        key="button"
        onClick={this.handleClickOpen}
        variant="contained"
      >
        Recover your wallet
      </Button>,
      <Dialog
        key="dialog"
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recover your Diadem Network wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your mnemonic or privateKey (one is enough) that were generated when you first visited Diadem Network
          </DialogContentText>
          <TextField
            autoFocus
            error={mnemonic !== '' && !isMnemonicValid}
            margin="normal"
            onChange={this.handleChange('mnemonic')}
            id="mnemonic"
            label="Mnemonic"
            fullWidth
            value={mnemonic}
            placeholder='this is a twelve words long key used to recover your wallet'
          />
          <TextField
            error={privateKey !== '' && !isPrivateKeyValid}
            margin="normal"
            onChange={this.handleChange('privateKey')}
            id="privateKey"
            label="PrivateKey"
            fullWidth
            value={privateKey}
            placeholder='ajca76skjcaqlxakmwuehdwd938cjaskjncskjncqlknca897scysc'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            color="secondary"
            disabled={!isFormValid}
            onClick={this.handleSubmit}
            variant="contained"
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
