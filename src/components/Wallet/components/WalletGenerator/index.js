import React, { Component } from 'react'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import { Button, Message } from 'semantic-ui-react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'

class WalletGenerator extends Component {
  state = {}

  generateWallet = async () => {
    const network = networks.testnet
    const mnemonic = generateMnemonic()
    const wallet = network.fromMnemonic(mnemonic)
    window.localStorage.setItem('privateKey', wallet.toWIF())
    const walletInfo = await wallet.getInfo()
    this.setState({ mnemonic, walletInfo })
  }

  componentDidMount () {
    this.generateWallet()
  }

  handleConfirm = () => {
    const { walletInfo } = this.state
    this.props.storeWalletInfo({ walletInfo })
  }

  render () {
    const { mnemonic } = this.state
    return [
      <Message
        key='message'
        warning
        header='A wallet has been created for you! Please store this mnemonic somewhere safe'
        content={mnemonic}
      />,
      <Button
        key='confirmButton'
        onClick={this.handleConfirm}
      >
        I have copied it somewhere safe
      </Button>
    ]
  }
}

WalletGenerator.propTypes = {
  storeWalletInfo: T.func.isRequired
}

export default withContainer(WalletGenerator)
