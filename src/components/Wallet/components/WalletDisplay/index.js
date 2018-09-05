import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Message } from 'semantic-ui-react'
import withContainer from './container'

class WalletDisplay extends Component {
  refreshWallet = () => {
    const { walletMeta, refreshWallet } = this.props
    refreshWallet(walletMeta.wallet)
  }

  componentDidMount () {
    this.refreshWallet()
    this.refreshInterval = setInterval(this.refreshWallet, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const { walletData } = this.props
    return (
      <Message success>Address: {walletData.addrStr} / Balance: {walletData.balance}</Message>
    )
  }
}

WalletDisplay.propTypes = {
  refreshWallet: T.func.isRequired,
  walletData: T.object.isRequired,
  walletMeta: T.object.isRequired
}

export default withContainer(WalletDisplay)
