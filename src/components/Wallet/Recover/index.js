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
import withMobileDialog from '@material-ui/core/withMobileDialog'

const MNEMONIC_INITIAL_VALUE = ''
const PRIVATE_KEY_INITIAL_VALUE = ''

class Recover extends Component {
  state = {
    open: true,
    mnemonic: MNEMONIC_INITIAL_VALUE,
    privateKey: PRIVATE_KEY_INITIAL_VALUE,
    isMnemonicValid: false,
    isPrivateKeyValid: false
  }

  startFailedOpenModalInterval = () => {
    this.interval = setInterval(() => {
      this.props.recoverFailReason === 'address-not-matching' && this.handleOpen()
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  componentDidMount () {
    this.startFailedOpenModalInterval()
  }

  handleOpen = () => {
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
    const { mnemonic, privateKey } = this.state
    this.props.recover({ mnemonic, privateKey })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    mnemonic: MNEMONIC_INITIAL_VALUE,
    privateKey: PRIVATE_KEY_INITIAL_VALUE,
    isMnemonicValid: false,
    isPrivateKeyValid: false
  })

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
    const { recoverFailReason, fullScreen } = this.props
    const isFormValid = isMnemonicValid || isPrivateKeyValid
    return [
      <Button
        color="secondary"
        key="button"
        onClick={this.handleOpen}
        variant="contained"
      >
        Recover your wallet
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key="dialog"
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Recover your Diadem Network wallet</DialogTitle>
        <DialogContent>
          {recoverFailReason === 'address-not-matching' && [
            <DialogContentText
              key="failure-message-title"
              paragraph
              variant="title"
            >
              Wallet found is not the one you registered with initially!
            </DialogContentText>,
            <DialogContentText
              key="failure-message-2"
              paragraph
            >
              Please provide info you received on very first visit.
            </DialogContentText>,
            <DialogContentText
              color="textSecondary"
              key="failure-message-subtitle"
              paragraph
              variant="caption"
            >
              You lost your initial privateKey/mnemonic? Sorry to tell you that if you had funds in it their are lost forever. Furthermore, you will have to wait for Diadem Network team to developp the possibility to force new registration with another wallet.
            </DialogContentText>
          ]}
          <DialogContentText>
            Please enter your mnemonic or privateKey (one is enough) that were generated when you first visited Diadem Network
          </DialogContentText>
          <TextField
            autoFocus={!fullScreen}
            error={mnemonic !== MNEMONIC_INITIAL_VALUE && !isMnemonicValid}
            margin="normal"
            onChange={this.handleChange('mnemonic')}
            id="mnemonic"
            label="Mnemonic"
            fullWidth
            value={mnemonic}
            placeholder='this is a twelve words long key used to recover your wallet'
          />
          <TextField
            error={privateKey !== PRIVATE_KEY_INITIAL_VALUE && !isPrivateKeyValid}
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
  fullScreen: T.bool,
  recoverFailReason: T.bool,
  recover: T.func
}

export default withMobileDialog()(Recover)
