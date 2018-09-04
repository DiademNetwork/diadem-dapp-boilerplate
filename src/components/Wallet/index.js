import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import WalletGenerated from './components/WalletGenerated'
import WalletDisplay from './components/WalletDisplay'
import WalletRecover from './components/WalletRecover'
import { Dimmer, Container, Message, Loader } from 'semantic-ui-react'
import withContainer from './container'

class Wallet extends Component {
  render () {
    const { isFBAuthenticated, walletStatus } = this.props
    let renderedComponent
    if (!isFBAuthenticated) {
      renderedComponent = <Message warning>You need to be authenticated with Facebook to use application</Message>
    } else {
      switch (walletStatus) {
        case 'none':
          renderedComponent = (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          )
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
  isFBAuthenticated: T.bool,
  walletStatus: T.string
}

export default withContainer(Wallet)
