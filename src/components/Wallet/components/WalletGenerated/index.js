import React, { Component } from 'react'
import { Button, Message } from 'semantic-ui-react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'

class WalletGenerated extends Component {
  handleConfirm = async () => {
    const { updateWalletMeta, updateWalletStatus } = this.props
    updateWalletMeta({})
    updateWalletStatus('restoring-info-saved')
  }

  render () {
    const { walletMeta } = this.props
    const { mnemonic, privateKey } = walletMeta
    return [
      <Message
        key='message'
        warning
      >
        <Message.Header>Protect your funds - Save your mnemonic and private key somewhere</Message.Header>
        <Message.List>
          <Message.Item>Mnemonic: {mnemonic}</Message.Item>
          <Message.Item>PrivateKey: {privateKey}</Message.Item>
        </Message.List>
      </Message>,
      <Button
        key='confirmButton'
        onClick={this.handleConfirm}
      >
        I have copied it somewhere safe
      </Button>
    ]
  }
}

WalletGenerated.propTypes = {
  updateWalletStatus: T.func.isRequired,
  updateWalletMeta: T.func.isRequired,
  walletMeta: T.object
}

export default withContainer(WalletGenerated)
