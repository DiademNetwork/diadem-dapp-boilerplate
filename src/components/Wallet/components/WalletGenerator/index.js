import React, { Component } from 'react'
import { networks, generateMnemonic } from 'qtumjs-wallet'
import { Button, Message } from 'semantic-ui-react'
import { PropTypes as T } from 'prop-types'

export default class WalletGenerator extends Component {
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
    this.props.onConfirm(this.state.walletInfo)
  }

  render () {
    const { mnemonic } = this.state
    return [
      <Message
        warning
        header='A wallet has been created for you! Please store this mnemonic somewhere safe'
        content={mnemonic}
      />,
      <Button
        onClick={this.handleConfirm}
      >
        I have copied it somewhere safe
      </Button>
    ]
  }
}

WalletGenerator.propTypes = {
  onConfirm: T.func.isRequired
}