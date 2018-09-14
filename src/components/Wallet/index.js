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

  startCheckRegistrationInterval = () => {
    const { checkUserRegistration } = this.props
    this.checkRegistrationInterval = setInterval(checkUserRegistration, 5000)
  }

  clearCheckRegistrationInterval = () => {
    clearInterval(this.checkRegistrationInterval)
  }

  componentWillUnmount = () => {
    this.clearCheckRegistrationInterval()
  }

  componentWillReceiveProps ({
    unconfirmedBalance: newUnconfirmedBalance,
    isRegistrationPending: newIsRegistrationPending
  }) {
    const {
      displayNotification,
      unconfirmedBalance,
      isRegistrationPending
    } = this.props
    // not the first load AND unconfirmedBalance changed
    if (unconfirmedBalance !== undefined && newUnconfirmedBalance !== unconfirmedBalance) {
      switch (true) {
        case unconfirmedBalance < 0 && newUnconfirmedBalance === 0: // token sent
          displayNotification(notifications.sentTokens)
          break
        case unconfirmedBalance > 0 && newUnconfirmedBalance === 0: // token received
          displayNotification(notifications.newAvailableTokens)
          break
        case unconfirmedBalance === 0 && newUnconfirmedBalance > 0: // token comming
          displayNotification(notifications.incomingTokens)
          break
        case unconfirmedBalance === 0 && newUnconfirmedBalance < 0: // token sending
          displayNotification(notifications.sendingTokens)
          break
        default:
          break
      }
    }
    if (newIsRegistrationPending !== isRegistrationPending) {
      if (newIsRegistrationPending) { // changed to pending
        this.startCheckRegistrationInterval()
      } else { // changed to non-pending
        this.clearCheckRegistrationInterval()
      }
    }
  }

  render () {
    const {
      address,
      balance,
      className,
      isFacebookAuthenticated,
      mnemonic,
      privateKey,
      recoverWallet,
      unconfirmedBalance,
      walletStatus,
      isRegistrationPending,
      updateWalletStatus,
      withdrawFromHotWallet
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
          renderedComponent = isRegistrationPending ? (
            <Typography color="textSecondary">Please wait while your registration get confirmed (it can take some minutes)...</Typography>
          ) : (
            <Display
              address={address}
              balance={balance}
              unconfirmedBalance={unconfirmedBalance}
              onRefreshWallet={this.handleRefreshWallet}
              withdrawFromHotWallet={withdrawFromHotWallet}
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
      <Card className={className}>
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
  checkUserRegistration: T.func,
  className: T.string,
  displayNotification: T.func,
  isFacebookAuthenticated: T.bool,
  isRegistrationPending: T.bool,
  mnemonic: T.string,
  privateKey: T.string,
  walletStatus: T.string,
  recoverWallet: T.func,
  refreshWallet: T.func,
  unconfirmedBalance: T.number,
  wallet: T.object,
  updateWalletStatus: T.func,
  withdrawFromHotWallet: T.func
}

export default withContainer(Wallet)
