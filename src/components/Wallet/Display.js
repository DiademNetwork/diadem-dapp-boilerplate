import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Hidden from '@material-ui/core/Hidden'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import CopyToClipBoardButton from './CopyToClipBoardButton'
import { withStyles } from '@material-ui/core/styles'
import HelpTooltip from '../HelpTooltip'
import Withdraw from './Withdraw'

const AUTO_WALLET_REFRESH_INTERVAL = 5000 // in ms

const styles = (theme) => ({
  withdraw: {
    marginLeft: theme.spacing.unit * 2
  }
})

const CopyToAddressToolip = ({ address }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title='Copy address to clipboard'
  >
    <CopyToClipBoardButton variant="icon" textToCopy={address} name="address" />
  </Tooltip>
)

CopyToAddressToolip.propTypes = {
  address: T.string
}

class WalletDisplay extends Component {
  componentDidMount () {
    this.refreshInterval = setInterval(this.props.onRefreshWallet, AUTO_WALLET_REFRESH_INTERVAL)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const {
      address,
      balance,
      classes,
      unconfirmedBalance,
      withdrawFromHotWallet
    } = this.props
    return (
      <List>
        <ListItem divider>
          <ListItemIcon>
            <LocalPostOfficeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={
            <Typography>
              {address}
              <Hidden smDown>
                <HelpTooltip text="This is the first address of your hot Diadem Network wallet. Send tokens to it in order to be able to support and deposit for achievements" />
                <CopyToAddressToolip address={address} />
              </Hidden>
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
                <Hidden smDown>
                  <HelpTooltip text={`This is your balance. Send QTUM token(s) to your hot Diadem Network wallet address ${address} to use in Diadem Network`} />
                  {balance > 0 &&
                    <Withdraw
                      balance={balance}
                      className={classes.withdraw}
                      onSubmit={withdrawFromHotWallet}
                    />
                  }
                </Hidden>
              </Typography>
            }
          />
        </ListItem>,
        <Hidden smUp>
          <ListItem>
            <CopyToClipBoardButton variant="button" textToCopy={address} name="address" />
            {balance > 0 &&
              <Withdraw
                balance={balance}
                className={classes.withdraw}
                onSubmit={withdrawFromHotWallet}
              />
            }
          </ListItem>
        </Hidden>
      </List>
    )
  }
}

WalletDisplay.propTypes = {
  address: T.string,
  balance: T.number,
  classes: T.object,
  onRefreshWallet: T.func,
  unconfirmedBalance: T.number,
  withdrawFromHotWallet: T.func
}

export default withStyles(styles)(WalletDisplay)
