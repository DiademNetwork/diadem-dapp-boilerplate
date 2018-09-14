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
import MoneyIcon from '@material-ui/icons/AttachMoney'
import Hidden from '@material-ui/core/Hidden'
import Link from '../../Link'

const AMOUNT_INITIAL_VALUE = ''

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
      className,
      confirmationsCount,
      fullScreen,
      link,
      name,
      title,
      walletBalance
    } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { amount, isAmountValid, modalOpen } = this.state
    return [
      <Button
        aria-label="Support"
        className={className}
        color="secondary"
        disabled={!isBalancePositive}
        key='achievement-support-button'
        onClick={this.handleClickOpen}
        variant="extendedFab"
      >
        <Hidden smDown>
          <MoneyIcon />
        </Hidden>
        Support
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
            <Link
              text="View achievement Facebook post again"
              href={link}
              typographyProps={{ paragraph: true }}
            />
            Please enter an amount (max {walletBalance} QTUM minus fees of around 0.1 QTUM) you would like to send to support {name}<br />
            for his achievement:<br /><br />
            {title}<br /><br />
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
  className: T.string,
  confirmationsCount: T.number,
  fullScreen: T.bool,
  link: T.string,
  name: T.string,
  onSupport: T.func,
  title: T.string,
  walletBalance: T.number
}

export default withMobileDialog()(AchievementSupport)
