import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PrivateKey } from 'qtumcore-lib'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import withContainer from './container'
import Modal from 'components/shared/Modal'

const MNEMONIC_INITIAL_VALUE = ''
const PRIVATE_KEY_INITIAL_VALUE = ''

const initialForm = {
  mnemonic: MNEMONIC_INITIAL_VALUE,
  privateKey: PRIVATE_KEY_INITIAL_VALUE,
  isMnemonicValid: false,
  isPrivateKeyValid: false
}

class WalletRecover extends Component {
  state = initialForm

  handleChange = (name) => e => {
    const value = e.target.value
    if (name === 'mnemonic') {
      const isMnemonicValid = this.isMnemonicValid(value)
      this.setState({ mnemonic: value, isMnemonicValid })
    } else if (name === 'privateKey') {
      const isPrivateKeyValid = PrivateKey.isValid(value)
      this.setState({ privateKey: value, isPrivateKeyValid })
    }
  }

  handleConfirm = () => {
    const { blockchain, recoverWallet } = this.props
    const { mnemonic, privateKey } = this.state
    recoverWallet({ blockchainKey: blockchain.key, mnemonic, privateKey })
    this.resetForm()
  }

  resetForm = () => this.setState(initialForm)

  is12WordsLong = R.compose(
    R.equals(12),
    R.length,
    R.split(' '),
    R.trim
  )

  isOnlyAlphaNumeric = R.test(/^\w+$/)

  isMnemonicValid = R.allPass([
    R.is(String),
    this.is12WordsLong
  ])

  render () {
    const { blockchain, status } = this.props
    const { mnemonic, privateKey, isMnemonicValid, isPrivateKeyValid } = this.state
    const isFormValid = isMnemonicValid || isPrivateKeyValid
    const isRecovering = status === 'is-recovering'
    return (
      <Modal
        confirmButtonDisabled={!isFormValid || isRecovering}
        confirmButtonText={isRecovering ? 'Loading...' : 'Confirm'}
        name={`${blockchain.name}-recover-modal`}
        noCancelButton
        onConfirm={this.handleConfirm}
        openButtonText="Recover"
        title={`Recover your ${blockchain.name} wallet`}
        controlledOpen={status === 'address-not-matching' ? true : undefined}
        render={({ fullScreen }) => (
          <Fragment>
            {status === 'address-not-matching' && (
              <Fragment>
                <DialogContentText
                  key="failure-message-title"
                  paragraph
                  variant="title"
                >
                  Wallet found is not the one you registered with initially!
                </DialogContentText>
                <DialogContentText
                  key="failure-message-2"
                  paragraph
                >
                  Please provide info you received on very first visit.
                </DialogContentText>
              </Fragment>
            )}
            <DialogContentText key="text">
              Please enter your mnemonic or privateKey (one is enough) that were generated when you first visited Diadem Network
            </DialogContentText>
            <TextField
              autoFocus={!fullScreen}
              data-qa-id="wallet-recover-form-mnemonic-input"
              error={mnemonic !== MNEMONIC_INITIAL_VALUE && !isMnemonicValid}
              fullWidth
              id="mnemonic"
              key="mnemonic"
              label="Mnemonic"
              margin="normal"
              onChange={this.handleChange('mnemonic')}
              placeholder='this is a twelve words long key used to recover your wallet'
              value={mnemonic}
            />
            <TextField
              data-qa-id="wallet-recover-form-privatekey-input"
              error={privateKey !== PRIVATE_KEY_INITIAL_VALUE && !isPrivateKeyValid}
              fullWidth
              id="privateKey"
              key="privateKey"
              label="PrivateKey"
              margin="normal"
              onChange={this.handleChange('privateKey')}
              placeholder='ajca76skjcaqlxakmwuehdwd938cjaskjncskjncqlknca897scysc'
              value={privateKey}
            />
          </Fragment>
        )}
      />
    )
  }
}

WalletRecover.propTypes = {
  blockchain: T.object,
  recoverWallet: T.func,
  status: T.string
}

export default R.compose(
  withContainer
)(WalletRecover)
