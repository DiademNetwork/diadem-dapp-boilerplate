import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Generated from './Generated'
import Display from './Display'
import Recover from './Recover'
import withContainer from './container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

class Wallet extends Component {
  render () {
    const {
      className,
      isFacebookLogged,
      userID,
      walletStatus
    } = this.props
    console.log(walletStatus)
    let renderedComponent
    if (!isFacebookLogged) {
      renderedComponent = (
        <Typography color="textPrimary">
          You must be logged with Facebook to use your wallet
        </Typography>
      )
    } else {
      switch (walletStatus) {
        case 'generated':
          renderedComponent = <Generated />
          break
        case 'needs-recovering':
        case 'recover-failed':
          renderedComponent = <Recover />
          break
        case 'loaded':
        case 'restoring-info-saved':
          renderedComponent = <Display userID={userID} />
          break
        case 'error':
        default:
          renderedComponent = null
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
  className: T.string,
  isFacebookLogged: T.bool,
  userID: T.string,
  walletStatus: T.string
}

export default withContainer(Wallet)
