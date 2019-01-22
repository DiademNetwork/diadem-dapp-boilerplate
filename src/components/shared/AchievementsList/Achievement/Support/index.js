import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import network from 'configurables/network'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import withContainer from './container'
import Modal from 'components/shared/Modal'
import Link from 'components/shared/Link'
import FeesSelector from 'components/shared/FeesSelector'
import blockchains from 'configurables/blockchains'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import * as U from 'utils'

const AMOUNT_INITIAL_VALUE = 0

const initialForm = (blockchainKey) => ({
  amount: AMOUNT_INITIAL_VALUE,
  areFeesValid: true,
  fees: FeesSelector.getInitialFees(blockchainKey),
  blockchainKey,
  isAmountValid: false
})

class SupportAchievement extends Component {
  state = initialForm(blockchains.primary.key)

  handleSelectCurrency = e => this.setState(initialForm(e.target.value))

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
    const { achievement, supportAchievement } = this.props
    const { amount, blockchainKey, fees } = this.state
    supportAchievement({
      amount,
      blockchainKey,
      creatorAddress: U.achievement.getCreatorAddress(achievement),
      fees: FeesSelector.convertFees({ blockchainKey, fees }),
      link: U.achievement.getLink(achievement)
    })
    this.resetForm()
  }

  resetForm = () => this.setState(initialForm(blockchains.primary.key))

  areAllBalancesEmpty = R.compose(
    R.equals(0),
    R.sum,
    R.values
  )

  render () {
    const {
      achievement,
      isPrimaryWalletReady,
      idx,
      walletsBalances
    } = this.props
    const {
      amount,
      areFeesValid,
      fees,
      isAmountValid,
      blockchainKey
    } = this.state
    const noBalance = this.areAllBalancesEmpty(walletsBalances)
    const blockchainSymbol = blockchains.all[blockchainKey].symbol
    const isFormValid = isAmountValid && areFeesValid
    const { title } = U.achievement.getActivities('create')(achievement)[0]
    const confirmationsCount = U.achievement.getActivities('confirm')(achievement).length
    return (
      <Modal
        confirmButtonDisabled={!isFormValid}
        confirmButtonText="Support"
        disabled={!isPrimaryWalletReady || noBalance}
        name={`achievement-${idx}-support-modal`}
        onConfirm={this.handleSubmit}
        openButtonIcon={<MoneyIcon />}
        openButtonText={noBalance ? 'You need tokens to support' : 'Support'}
        title="Support"
        render={({ fullScreen }) => (
          <Fragment>
            <DialogContentText paragraph>
              Achievement: {title}
              <Link
                text={`View post on ${network.name} again`}
                href={U.achievement.getLink(achievement)}
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
          </Fragment>
        )}
      />
    )
  }
}

SupportAchievement.propTypes = {
  achievement: T.object,
  isPrimaryWalletReady: T.bool,
  idx: T.number,
  supportAchievement: T.func,
  walletsBalances: T.object
}

export default R.compose(
  withContainer
)(SupportAchievement)
