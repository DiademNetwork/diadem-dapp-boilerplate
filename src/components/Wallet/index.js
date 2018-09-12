import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Generated from './Generated'
import Display from './Display'
import Recover from './Recover'
import withContainer from './container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import notifications from '../../services/notifications'

class Wallet extends Component {
  handleRefreshWallet = () => {
    const { refreshWallet, wallet } = this.props
    refreshWallet(wallet)
  }

  componentWillReceiveProps ({ unconfirmedBalance: newUnconfirmedBalance }) {
    const { displayNotification, unconfirmedBalance } = this.props
    // not the first load AND unconfirmedBalance changed
    if (unconfirmedBalance !== undefined && newUnconfirmedBalance !== unconfirmedBalance) {
      const notificationToShow = newUnconfirmedBalance === 0
        ? notifications.newAvailableTokens
        : notifications.incomingTokens
      displayNotification(notificationToShow)
    }
  }

  render () {
    const {
      address,
      balance,
      isFacebookAuthenticated,
      mnemonic,
      privateKey,
      updateWalletStatus,
      recoverWallet,
      unconfirmedBalance,
      walletStatus
    } = this.props
    let renderedComponent
    if (!isFacebookAuthenticated) {
      renderedComponent = (
        <Typography color="textPrimary">
          You must be logged with Facebook to use your wallet
        </Typography>
      )
    } else {
      switch (walletStatus) {
        case 'none':
          renderedComponent = (
            <Typography color="textSecondary">Loading...</Typography>
          )
          break
        case 'generated':
          renderedComponent = <Generated
            mnemonic={mnemonic}
            privateKey={privateKey}
            onConfirm={() => updateWalletStatus('restoring-info-saved')}
          />
          break
        case 'needs-recovering':
          renderedComponent = (
            <Recover onRecover={recoverWallet} />
          )
          break
        case 'restored':
        case 'restoring-info-saved':
          renderedComponent = (
            <Display
              address={address}
              balance={balance}
              unconfirmedBalance={unconfirmedBalance}
              onRefreshWallet={this.handleRefreshWallet}
            />
          )
          break
        case 'error':
        default:
          renderedComponent = (
            <Typography error>
              Sorry, and error happenned when trying to retrieve your wallet.
            </Typography>
          )
          break
      }
    }
    return (
      <Card>
        <CardContent>
          <Typography paragraph color="textSecondary">Your Diadem Network wallet</Typography>
          {renderedComponent}
        </CardContent>
      </Card>
    )
  }
}

Wallet.propTypes = {
  address: T.string,
  balance: T.number,
  displayNotification: T.func,
  isFacebookAuthenticated: T.bool,
  mnemonic: T.string,
  privateKey: T.string,
  walletStatus: T.string,
  recoverWallet: T.func,
  refreshWallet: T.func,
  unconfirmedBalance: T.number,
  updateWalletStatus: T.func,
  wallet: T.object
}

export default withContainer(Wallet)
