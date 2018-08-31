import React from 'react'
import { PropTypes as T } from 'prop-types'
import { List } from 'semantic-ui-react'
import withContainer from './container'

const WalletDisplay = ({ walletInfo }) => (
  <List>
    <List.Item>Address: {walletInfo.addrStr}</List.Item>
    <List.Item>Balance: {walletInfo.balance}</List.Item>
  </List>
)

WalletDisplay.propTypes = {
  walletInfo: T.object
}

export default withContainer(WalletDisplay)
