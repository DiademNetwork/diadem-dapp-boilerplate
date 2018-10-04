import React from 'react'
import { PropTypes as T } from 'prop-types'
import Generated from './Generated'
import Display from './Display'
import Recover from './Recover'
import withContainer from './container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const WalletComponent = ({ isFacebookLogged, loadFailReason, walletStatus, userID }) => {
  switch (true) {
    case !isFacebookLogged:
      return <Typography>You must be logged with Facebook to use your wallet</Typography>
    case loadFailReason === 'no-private-key':
    case loadFailReason === 'address-not-matching':
      return <Recover />
    case walletStatus === 'generated':
      return <Generated />
    case walletStatus === 'loaded':
    case walletStatus === 'recovered':
    case walletStatus === 'restoring-info-saved':
      return <Display userID={userID} />
    default:
      return <Typography>Loading...</Typography>
  }
}

WalletComponent.propTypes = {
  isFacebookLogged: T.bool,
  loadFailReason: T.string,
  userID: T.string,
  walletStatus: T.string
}

const Wallet = ({ className, ...props }) => (
  <Card className={className}>
    <CardContent>
      <Typography paragraph color="textSecondary">Your Diadem Network wallet</Typography>
      {WalletComponent(props)}
    </CardContent>
  </Card>
)

Wallet.propTypes = {
  className: T.string
}

export default withContainer(Wallet)
