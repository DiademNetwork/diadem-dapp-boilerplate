import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { List } from 'semantic-ui-react'

export default class WalletDisplay extends Component {
  render () {
    const { walletInfo } = this.props
    return (
      <List>
        <List.Item>Address: {walletInfo.addrStr}</List.Item>
        <List.Item>Balance: {walletInfo.balance}</List.Item>
      </List>
    )
  }
}

WalletDisplay.propTypes = {
  walletInfo: T.object
}
