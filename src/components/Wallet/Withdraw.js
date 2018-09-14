import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import WithdrawIcon from '@material-ui/icons/AccountBalanceWalletOutlined'

const AMOUNT_INITIAL_VALUE = 0
const ADDRESS_INITIAL_VALUE = ''

class Withdraw extends Component {
  state = {
    address: ADDRESS_INITIAL_VALUE,
    amount: AMOUNT_INITIAL_VALUE,
    isAmountValid: false,
    isAddressValid: false,
    modalOpen: false
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    const value = e.target.value
    const { balance } = this.props
    if (name === 'address') {
      const isAddressValid = value !== ''
      this.setState({ address: value, isAddressValid })
    } else if (name === 'amount') {
      const isAmountValid = value > 0 && value <= balance
      this.setState({ amount: value, isAmountValid })
    }
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { address, amount } = this.state
    onSubmit({ address, amount })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    address: ADDRESS_INITIAL_VALUE,
    amount: AMOUNT_INITIAL_VALUE,
    isAmountValid: false,
    isAddressValid: false
  })

  render () {
    const { balance, className, fullScreen } = this.props
    const { address, isAddressValid, amount, isAmountValid, modalOpen } = this.state
    const isFormValid = isAmountValid && isAddressValid
    return [
      <Button
        aria-label="Create"
        className={className}
        color="secondary"
        key='withdraw-button'
        onClick={this.handleClickOpen}
        variant="extendedFab"
      >
        <WithdrawIcon /> Withdraw
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key='withdraw-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a withdrawal address and an amount (max your {balance} QTUM minus fees) to withdraw tokens from your Diadem network hot wallet
          </DialogContentText>
          <TextField
            autoFocus
            error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
            margin="normal"
            id='amount'
            label="Amount (in QTUM)"
            value={amount}
            onChange={this.handleChange('amount')}
            type='number'
            placeholder={`max ${balance} minus fees`}
            fullWidth
            helperText='Fees are around 0.01 QTUM'
          />
          <TextField
            autoFocus
            error={address !== ADDRESS_INITIAL_VALUE && !isAddressValid}
            margin="normal"
            id='address'
            label="Target addres"
            value={address}
            onChange={this.handleChange('address')}
            fullWidth
            helperText='Please copy address in full. Diadem Network is not responsible if you enter wrong address'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!isFormValid}
            onClick={this.handleSubmit}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

Withdraw.propTypes = {
  balance: T.number,
  className: T.string,
  fullScreen: T.bool,
  onSubmit: T.func
}

export default withMobileDialog()(Withdraw)
