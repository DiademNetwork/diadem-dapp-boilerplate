import React, { Component, Fragment } from 'react'
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
import Link from 'components/shared/Link'
import FeesSelector from 'components/shared/FeesSelector'

const AMOUNT_INITIAL_VALUE = ''

class AchievementSupport extends Component {
  state = {
    amount: AMOUNT_INITIAL_VALUE,
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
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
      idx,
      link,
      creatorName,
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
    return (
      <Fragment>
        <Button
          aria-label="Support"
          className={className}
          color="secondary"
          data-qa-id={`achievement-${idx}-support-button`}
          disabled={!isBalancePositive}
          key='achievement-support-button'
          onClick={this.handleClickOpen}
          variant={fullScreen ? 'contained' : 'extendedFab'}
        >
          <Hidden smDown>
            <MoneyIcon />
          </Hidden>
          Support
        </Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          data-qa-id={`achievement-${idx}-support-modal`}
          fullScreen={fullScreen}
          key='achievement-support-modal'
          open={modalOpen}
          onClose={this.handleClose}
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
              Please enter an amount you would like to send to support {creatorName} for his achievement:
            </DialogContentText>
            <DialogContentText paragraph color="textPrimary">
              {title}
            </DialogContentText>
            <Divider style={{ marginBottom: '16px' }} />
            <TextField
              autoFocus={!fullScreen}
              data-qa-id={`achievement-${idx}-support-form-amount-input`}
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
            <Button
              color="primary"
              data-qa-id={`achievement-${idx}-support-cancel-button`}
              onClick={this.handleClose}
            >
              Cancel
            </Button>
            <Button
              data-qa-id={`achievement-${idx}-support-submit-button`}
              disabled={!isAmountValid}
              onClick={this.handleSubmit}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AchievementSupport.propTypes = {
  className: T.string,
  confirmationsCount: T.number,
  fullScreen: T.bool,
  idx: T.number,
  link: T.string,
  creatorName: T.string,
  onSupport: T.func,
  title: T.string,
  walletBalance: T.number
}

export default withMobileDialog()(AchievementSupport)
