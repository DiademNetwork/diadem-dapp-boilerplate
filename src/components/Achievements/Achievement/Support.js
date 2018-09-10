import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class AchievementSupport extends Component {
  state = {
    amount: 0,
    modalOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChange = e => {
    this.setState({ amount: e.target.value })
  }

  handleSubmit = () => {
    const { onSupport } = this.props
    const { amount } = this.state
    onSupport(amount)
    this.setState({ amount: 0 })
    this.handleClose()
  }

  render () {
    const { className, author, text, title, walletBalance } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { modalOpen } = this.state
    return [
      <Button
        className={className}
        key='achievement-support-button'
        disabled={!isBalancePositive}
        onClick={this.handleClickOpen}
        variant="contained"
        color="primary"
      >
        {isBalancePositive ? text : 'Support needs a positive balance'}
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
            Please enter an amount you would like to send to support author <strong>{author} </strong><br />
            for his achievement: <strong>{title}</strong>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id='amount'
            label="Amount (in QTUM)"
            value={this.state.amount}
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
            disabled={this.state.amount <= 0}
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
  author: T.string,
  className: T.string,
  onSupport: T.func,
  title: T.string,
  walletBalance: T.number,
  text: T.string
}

export default AchievementSupport
