import React, { Component } from 'react'
import WalletGenerator from './components/WalletGenerator'
import WalletDisplay from './components/WalletDisplay'
import { Dimmer, Container, Loader } from 'semantic-ui-react'
import { networks } from 'qtumjs-wallet'

export default class Wallet extends Component {
  state = {
    status: 'loading',
    walletInfo: null
  }

  async componentDidMount () {
    if (!window.localStorage) {
      this.setState({ status: 'no-local-storage' })
      return
    }
    const storedPrivateKey = window.localStorage.getItem('privateKey')
    if (!storedPrivateKey) {
      this.setState({ status: 'no-stored-privateKey' })
      return
    }
    const wallet = networks.testnet.fromWIF(storedPrivateKey)
    this.displayWalletInfo(await wallet.getInfo())
  }

  displayWalletInfo = walletInfo => {
    this.setState({ walletInfo, status: 'wallet-retrieved' })
  }

  render () {
    const { status, walletInfo } = this.state
    const loader = (
      <Dimmer active inverted>
        <Loader />
      </Dimmer>
    )
    let renderedComponent
    switch (status) {
      case 'loading':
        renderedComponent = loader
        break
      case 'no-local-storage':
        renderedComponent = <p>Please update your browser</p>
        break
      case 'no-stored-privateKey':
        renderedComponent = <WalletGenerator onConfirm={this.displayWalletInfo} />
        break
      case 'wallet-retrieved':
        renderedComponent = <WalletDisplay walletInfo={walletInfo} />
        break
      default:
        break
    }
    return (
      <Container>
        {renderedComponent}
      </Container>
    )
  }
}
