import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import Zoom from '@material-ui/core/Zoom'
import { Typography } from '@material-ui/core'
import CopyToClipBoardButton from './CopyToClipBoardButton'
import HelpTooltip from '../HelpTooltip'

const AUTO_WALLET_REFRESH_INTERVAL = 5000 // in ms

class WalletDisplay extends Component {
  componentDidMount () {
    this.refreshInterval = setInterval(this.props.onRefreshWallet, AUTO_WALLET_REFRESH_INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const { address, balance, unconfirmedBalance } = this.props
    return (
      <List>
        <ListItem>
          <ListItemIcon>
            <LocalPostOfficeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={
            <Typography>
              {address}
              <HelpTooltip text="This is the first address of your hot Diadem Network wallet. Send tokens to it in order to be able to support and deposit for achievements" />
              <Tooltip
                TransitionComponent={Zoom}
                title='Copy address to clipboard'
              >
                <CopyToClipBoardButton text={address} />
              </Tooltip>
            </Typography>
          } />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MonetizationOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography>
                {balance} QTUM{unconfirmedBalance > 0 ? ` (${unconfirmedBalance} QTUM pending)` : ''}
                <HelpTooltip text={`This is your balance. Send QTUM token(s) to your hot Diadem Network wallet address ${address} to use in Diadem Network`} />
              </Typography>
            }
          />
        </ListItem>
      </List>
    )
  }
}

WalletDisplay.propTypes = {
  address: T.string,
  balance: T.number,
  onRefreshWallet: T.func,
  unconfirmedBalance: T.number
}

export default WalletDisplay
