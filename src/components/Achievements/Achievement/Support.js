import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const AMOUNT_INITIAL_VALUE = 0

class AchievementSupport extends Component {
  state = {
    amount: AMOUNT_INITIAL_VALUE,
    isAmountValid: false,
    modalOpen: false
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = e => {
    const amount = e.target.value
    const isAmountValid = amount > 0
    this.setState({ amount, isAmountValid })
  }

  handleSubmit = () => {
    const { onSupport } = this.props
    const { amount } = this.state
    onSupport(amount)
    this.setState({ amount: 0 })
    this.handleClose()
  }

  render () {
    const {
      actionAlreadyDone,
      author,
      className,
      title,
      walletBalance
    } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { amount, isAmountValid, modalOpen } = this.state
    return [
      <Button
        className={className}
        key='achievement-support-button'
        disabled={!isBalancePositive || actionAlreadyDone}
        onClick={this.handleClickOpen}
        variant="contained"
        color="primary"
      >
        {actionAlreadyDone ? 'You already supported' : 'Support'}
      </Button>,
      <Dialog
        key='achievement-support-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Support</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter an amount (max {walletBalance} QTUM) you would like to send to support author <strong>{author} </strong><br />
            for his achievement: <strong>{title}</strong>
          </DialogContentText>
          <TextField
            autoFocus
            error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
            margin="normal"
            id='amount'
            label="Amount (in QTUM)"
            value={amount}
            onChange={this.handleChange}
            type='number'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!isAmountValid}
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

AchievementSupport.propTypes = {
  actionAlreadyDone: T.bool,
  author: T.string,
  className: T.string,
  onSupport: T.func,
  title: T.string,
  walletBalance: T.number
}

export default AchievementSupport
