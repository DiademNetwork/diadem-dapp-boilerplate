import React, { Component, Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
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
import network from 'configurables/network'
import blockchains from 'configurables/blockchains'
import * as R from 'ramda'
import withContainer from './container'

const AMOUNT_INITIAL_VALUE = 0

const initialForm = (blockchainKey) => ({
  amount: AMOUNT_INITIAL_VALUE,
  areFeesValid: true,
  fees: FeesSelector.getInitialFees(blockchainKey),
  blockchainKey,
  isAmountValid: false
})

class AchievementSupport extends Component {
  state = {
    ...initialForm(blockchains.primary.key),
    modalOpen: false
  }

  handleSelectCurrency = e => {
    this.setState({
      ...initialForm(e.target.value)
    })
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = e => {
    const amount = e.target.value
    const isAmountValid = amount > 0
    this.setState({ amount, isAmountValid })
  }

  handleFeesChange = (fees) => this.setState(({ blockchainKey }) => ({
    areFeesValid: FeesSelector.areFeesValid({ blockchainKey, fees }),
    fees
  }))

  handleSubmit = () => {
    const { currentAchievement, supportAchievement } = this.props
    const { amount, fees } = this.state
    supportAchievement({ amount, fees: FeesSelector.convertFees(fees), link: currentAchievement.object })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
    isAmountValid: false
  })

  areAllBalancesEmpty = R.compose(
    R.equals(0),
    R.sum,
    R.values
  )

  render () {
    const {
      className,
      confirmationsCount,
      fullScreen,
      idx,
      link,
      creatorName,
      title,
      walletsBalances
    } = this.props
    const {
      amount,
      areFeesValid,
      fees,
      isAmountValid,
      blockchainKey,
      modalOpen
    } = this.state
    const noBalance = this.areAllBalancesEmpty(walletsBalances)
    const blockchainSymbol = blockchains.all[blockchainKey].symbol
    return (
      <Fragment>
        <Button
          aria-label="Support"
          className={className}
          color="secondary"
          data-qa-id={`achievement-${idx}-support-button`}
          disabled={noBalance}
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
          <DialogTitle id="form-dialog-title">Support {creatorName}</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              Achievement: {title}
              <Link
                text={`View post on ${network.name} again`}
                href={link}
                typographyProps={{ paragraph: true }}
              />
              {confirmationsCount === 0 ? (
                `Are you sure of what you do ? This achievement has not been confirmed by anyone yet`
              ) : (
                `This achievement has been confirmed ${confirmationsCount} times`
              )}
            </DialogContentText>
            <Divider style={{ marginBottom: '16px' }} />
            <TextField
              data-qa-id={`achievement-${idx}-support-form-currency-select`}
              fullWidth
              label="Select currency for support"
              margin="normal"
              onChange={this.handleSelectCurrency}
              select
              value={blockchainKey}
            >
              {Object.keys(walletsBalances).map((key, itemIdx) => (
                <MenuItem
                  data-qa-id={`achievement-${idx}-support-form-currency-${itemIdx}-select`}
                  key={key}
                  value={key}
                >
                  {blockchains.get(key).name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus={!fullScreen}
              data-qa-id={`achievement-${idx}-support-form-amount-input`}
              error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
              margin="normal"
              id='amount'
              label={`Amount in ${blockchainSymbol} - maximum ${walletsBalances[blockchainKey]} ${blockchainSymbol} minus fees)`}
              value={amount}
              onChange={this.handleChange}
              type='number'
              fullWidth
            />
            <FeesSelector
              blockchain={blockchains.get(blockchainKey)}
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
  creatorName: T.string,
  currentAchievement: T.object,
  fullScreen: T.bool,
  idx: T.number,
  link: T.string,
  supportAchievement: T.func,
  title: T.string,
  walletsBalances: T.object
}

export default R.compose(
  withMobileDialog(),
  withContainer
)(AchievementSupport)
