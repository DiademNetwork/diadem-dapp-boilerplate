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
import FeesSelector from '../../FeesSelector'

const AMOUNT_INITIAL_VALUE = ''

class AchievementSupport extends Component {
  state = {
    amount: AMOUNT_INITIAL_VALUE,
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
    isAmountValid: false,
    modalOpen: true
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = e => {
    const amount = e.target.value
    const isAmountValid = amount > 0
    this.setState({ amount, isAmountValid })
  }

  handleFeesChange = (fees) => {
    const areFeesValid = FeesSelector.areFeesValid(fees)
    this.setState({
      fees,
      areFeesValid
    })
  }

  handleSubmit = () => {
    const { onSupport } = this.props
    const { amount, fees } = this.state
    onSupport({ amount, fees: FeesSelector.convertFees(fees) })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
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
    const {
      amount,
      areFeesValid,
      fees,
      isAmountValid,
      modalOpen
    } = this.state
    return [
      <Button
        aria-label="Support"
        className={className}
        color="secondary"
        disabled={!isBalancePositive}
        key='achievement-support-button'
        onClick={this.handleClickOpen}
        variant={fullScreen ? 'contained' : 'extendedFab'}
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
          <DialogContentText paragraph>
            {confirmationsCount === 0 ? (
              `Are you sure of what you do ? This achievement has not been confirmed by anyone yet`
            ) : (
              `This achievement has been confirmed ${confirmationsCount} times`
            )}
          </DialogContentText>
          <Divider style={{ marginBottom: '16px' }} />
          <DialogContentText paragraph>
            <Link
              text="View achievement Facebook post again"
              href={link}
              typographyProps={{ paragraph: true }}
            />
            Please enter an amount you would like to send to support {name} for his achievement:
          </DialogContentText>
          <DialogContentText paragraph color="textPrimary">
            {title}
          </DialogContentText>
          <Divider style={{ marginBottom: '16px' }} />
          <TextField
            autoFocus={!fullScreen}
            error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
            margin="normal"
            id='amount'
            label={`Amount in QTUM - maximum ${walletBalance} QTUM minus fees)`}
            value={amount}
            onChange={this.handleChange}
            type='number'
            fullWidth
          />
          <FeesSelector
            error={!areFeesValid}
            onChange={this.handleFeesChange}
            value={fees}
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
