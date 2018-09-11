import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const AMOUNT_INITIAL_VALUE = 0
const WITNESS_USER_ID_INITIAL_VALUE = ''

class AchievementDeposit extends Component {
  state = {
    amount: AMOUNT_INITIAL_VALUE,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE,
    isWitnessUserIDValid: false,
    isAmountValid: false,
    modalOpen: false
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'witnessUserID') {
      const isWitnessUserIDValid = R.test(/^[0-9]/)(value)
      this.setState({ witnessUserID: value, isWitnessUserIDValid })
    } else if (name === 'amount') {
      const isAmountValid = value > 0
      this.setState({ amount: value, isAmountValid })
    }
  }

  handleSubmit = () => {
    const { onDeposit } = this.props
    const { amount, witnessUserID } = this.state
    onDeposit({ amount, witnessUserID })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE,
    isWitnessUserIDValid: false,
    isAmountValid: false
  })

  render () {
    const {
      actionAlreadyDone,
      author,
      className,
      title,
      walletBalance
    } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { amount, modalOpen, witnessUserID, isWitnessUserIDValid, isAmountValid } = this.state
    return [
      <Button
        className={className}
        key='achievement-deposit-button'
        disabled={!isBalancePositive || actionAlreadyDone}
        onClick={this.handleClickOpen}
        variant="contained"
        color="primary"
      >
        {actionAlreadyDone ? 'You have already deposit' : 'Deposit'}
      </Button>,
      <Dialog
        key='achievement-deposit-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter an amount (max ${walletBalance} QTUM) you would like to send to support author <strong>{author} </strong><br />
            for his achievement: <strong>{title}</strong>
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
            fullWidth
          />
          <TextField
            error={witnessUserID !== WITNESS_USER_ID_INITIAL_VALUE && !isWitnessUserIDValid}
            margin="normal"
            id='witnessUserID'
            label="userID of witness"
            value={witnessUserID}
            onChange={this.handleChange('witnessUserID')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!isWitnessUserIDValid || !isAmountValid}
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

AchievementDeposit.propTypes = {
  actionAlreadyDone: T.bool,
  author: T.string,
  className: T.string,
  onDeposit: T.func,
  title: T.string,
  walletBalance: T.number
}

export default AchievementDeposit
