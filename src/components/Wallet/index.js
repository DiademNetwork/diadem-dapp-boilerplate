import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import WalletGenerated from './components/WalletGenerated'
import WalletDisplay from './components/WalletDisplay'
import WalletRecover from './components/WalletRecover'
import { Container, Message } from 'semantic-ui-react'
import withContainer from './container'

class Wallet extends Component {
  render () {
    const { isFBAuthenticated, walletStatus } = this.props
    let renderedComponent
    if (!isFBAuthenticated) {
      renderedComponent = <Message warning>You must be logged with Facebook to use your wallet</Message>
    } else {
      switch (walletStatus) {
        case 'none':
          renderedComponent = <Message info>Loading...</Message>
          break
        case 'generated':
          renderedComponent = <WalletGenerated />
          break
        case 'needs-recovering':
          renderedComponent = <WalletRecover />
          break
        case 'restored':
        case 'restoring-info-saved':
          renderedComponent = <WalletDisplay />
          break
        case 'error':
        default:
          renderedComponent = <Message error>Sorry, and error happenned when trying to retrieve your wallet.</Message>
          break
      }
    }
    return (
      <Container style={{ backgroundColor: '#FFF', marginTop: '3.8em' }}>
        {renderedComponent}
      </Container>
    )
  }
}

Wallet.propTypes = {
  isFBAuthenticated: T.bool,
  walletStatus: T.string
}

export default withContainer(Wallet)
