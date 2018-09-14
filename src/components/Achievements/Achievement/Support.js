import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import withMobileDialog from '@material-ui/core/withMobileDialog'

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
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    isAmountValid: false
  })

  render () {
    const {
      actionAlreadyDone,
      className,
      confirmationsCount,
      fullScreen,
      name,
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
        color="secondary"
      >
        {actionAlreadyDone ? 'You already supported' : 'Support'}
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key='achievement-support-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Support</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationsCount === 0 ? (
              `Are you sure of what you do ? This achievement has not been confirmed by anyone yet`
            ) : (
              `This achievement has been confirmed ${confirmationsCount} times`
            )}<br /><br />
            <Divider />
            <br />
            Please enter an amount (max {walletBalance} QTUM minus fees of around 0.01 QTUM) you would like to send to support {name}<br />
            for his achievement: {title}<br /><br />
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
            color="secondary"
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
  className: T.string,
  confirmationsCount: T.number,
  fullScreen: T.bool,
  name: T.string,
  onSupport: T.func,
  title: T.string,
  walletBalance: T.number
}

export default withMobileDialog()(AchievementSupport)
