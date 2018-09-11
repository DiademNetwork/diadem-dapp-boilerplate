import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class AchievementDeposit extends Component {
  state = {
    amount: 0,
    witnessUserID: '',
    modalOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = () => {
    const { onDeposit } = this.props
    const { amount, witnessUserID } = this.state
    onDeposit({ amount, witnessUserID })
    this.setState({ amount: 0, witnessUserID: '' })
    this.handleClose()
  }

  render () {
    const { className, author, text, title, walletBalance } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { amount, modalOpen, witnessUserID } = this.state
    return [
      <Button
        className={className}
        key='achievement-deposit-button'
        disabled={!isBalancePositive}
        onClick={this.handleClickOpen}
        variant="contained"
        color="primary"
      >
        {isBalancePositive ? text : 'Deposit needs a positive balance'}
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
            Please enter an amount you would like to send to support author <strong>{author} </strong><br />
            for his achievement: <strong>{title}</strong>
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id='amount'
            label="Amount (in QTUM)"
            value={amount}
            onChange={this.handleChange('amount')}
            type='number'
            fullWidth
          />
          <TextField
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
            disabled={amount <= 0 || witnessUserID === ''}
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
  author: T.string,
  className: T.string,
  onDeposit: T.func,
  title: T.string,
  walletBalance: T.number,
  text: T.string
}

export default AchievementDeposit
