import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FeesSelector from 'components/shared/FeesSelector'
import Modal from 'components/shared/Modal'
import withContainer from './container'

const AMOUNT_INITIAL_VALUE = 0
const ADDRESS_INITIAL_VALUE = ''

class WalletWithdraw extends Component {
  constructor (props) {
    super(props)
    this.state = this.getInitialForm()
  }

  getInitialForm = () => ({
    areFeesValid: true,
    address: ADDRESS_INITIAL_VALUE,
    amount: AMOUNT_INITIAL_VALUE,
    fees: FeesSelector.getInitialFees(this.props.blockchain.key),
    isAmountValid: false,
    isAddressValid: false
  })

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'address') {
      const isAddressValid = value !== ''
      this.setState({ address: value, isAddressValid })
    } else if (name === 'amount') {
      const isAmountValid = !!value && value > 0 && value <= this.props.balance
      this.setState({ amount: value, isAmountValid })
    }
  }

  handleFeesChange = (fees) => {
    const { blockchain } = this.props
    const areFeesValid = FeesSelector.areFeesValid({ blockchainKey: blockchain.key, fees })
    this.setState({
      fees,
      areFeesValid
    })
  }

  handleConfirm = () => {
    const { blockchain } = this.props
    const { address, amount, fees } = this.state
    this.props.withdraw({ blockchainKey: blockchain.key, address, amount, fees })
    this.resetForm()
  }

  resetForm = () => this.setState(this.getInitialForm())

  render () {
    const { balance, blockchain } = this.props
    const {
      address,
      amount,
      areFeesValid,
      fees,
      isAddressValid,
      isAmountValid
    } = this.state
    const isFormValid = isAmountValid && isAddressValid && areFeesValid
    return (
      <Modal
        confirmButtonDisabled={!isFormValid}
        confirmButtonText="Confirm"
        disabled={balance === 0}
        name={`${blockchain.name}-withdraw-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Withdraw"
        title={`Withdraw your ${blockchain.name} token`}
        render={({ fullScreen }) => (
          <Fragment>
            <Typography key="text" variant="body1">
              Please provide a withdrawal address and an amount (max {balance} {blockchain.symbol} minus some fees) to withdraw tokens from your Diadem network hot wallet
            </Typography>
            <TextField
              autoFocus={!fullScreen}
              data-qa-id="withdraw-form-amount-input"
              error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
              fullWidth
              id='amount'
              key="amount"
              label={`Amount (in ${blockchain.symbol})`}
              margin="normal"
              onChange={this.handleChange('amount')}
              placeholder={`max ${balance} minus fees`}
              type='number'
              value={amount}
            />
            <TextField
              data-qa-id="withdraw-form-address-input"
              error={address !== ADDRESS_INITIAL_VALUE && !isAddressValid}
              fullWidth
              helperText='Please copy address in full. Diadem Network is not responsible if you enter wrong address'
              id='address'
              label="Target addres"
              margin="normal"
              onChange={this.handleChange('address')}
              value={address}
            />
            <FeesSelector
              blockchain={blockchain}
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

WalletWithdraw.defaultProps = {
  balance: 0
}

WalletWithdraw.propTypes = {
  balance: T.number,
  blockchain: T.object,
  withdraw: T.func
}

export default R.compose(
  withContainer
)(WalletWithdraw)
