import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import WalletGenerator from './components/WalletGenerator'
import WalletDisplay from './components/WalletDisplay'
import { Dimmer, Container, Loader } from 'semantic-ui-react'
import { networks } from 'qtumjs-wallet'
import withContainer from './container'

class Wallet extends Component {
  state = {
    status: 'loading'
  }

  async componentDidMount () {
    const { storeWalletInfo, walletInfo } = this.props
    if (walletInfo) { return }
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
    storeWalletInfo({ wallet, walletInfo: await wallet.getInfo() })
  }

  render () {
    const { status } = this.state
    let renderedComponent
    if (this.props.walletInfo) {
      renderedComponent = <WalletDisplay />
    } else {
      const loader = (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )
      switch (status) {
        case 'loading':
          renderedComponent = loader
          break
        case 'no-local-storage':
          renderedComponent = <p>Please update your browser</p>
          break
        case 'no-stored-privateKey':
          renderedComponent = <WalletGenerator />
          break
        default:
          break
      }
    }
    return (
      <Container>
        {renderedComponent}
      </Container>
    )
  }
}

Wallet.propTypes = {
  storeWalletInfo: T.func.isRequired,
  walletInfo: T.object
}

export default withContainer(Wallet)
