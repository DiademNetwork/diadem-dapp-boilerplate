import React, { Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Recover from './Recover'
import Register from './Register'
import Refund from './Refund'
import Withdraw from './Withdraw'
import SaveRecoveryInfo from './SaveRecoveryInfo'
import withContainer from './container'
import blockchains from 'configurables/blockchains'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  },
  actions: {
    justifyContent: 'flex-end'
  }
})

const Wallet = ({
  balance,
  blockchain,
  classes,
  isRegistered,
  isRegistrationPending,
  status,
  unconfirmedBalance
}) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar
          alt={`${blockchain.name} logo`}
          src={blockchain.logo}
        />
      }
      title={`${blockchain.name} - ${balance} ${blockchains.get(blockchain.key).symbol}${Number(unconfirmedBalance) !== 0 ? ` (${unconfirmedBalance} pending)` : ''}`}
      subheader={
        status === 'registration-failed'
          ? 'Registration failed. Please try later'
          : status === 'is-generating'
            ? 'Generating wallet...'
            : undefined
      }
    />
    <CardActions className={classes.actions}>
      {(() => {
        if (status === 'generated') {
          const startsOpen = blockchain.key == blockchains.primary.key ? false : true
          return <SaveRecoveryInfo blockchain={blockchain} startsOpen={startsOpen} />
        }
        if (isRegistered) {
          return (
            <Fragment>
              <Withdraw blockchain={blockchain} />
              <Refund blockchain={blockchain} />
            </Fragment>
          )
        }
        if (isRegistrationPending) {
          return <Register blockchain={blockchain} pending />
        }
        return (
          <Fragment>
            <Register blockchain={blockchain} />
            <Recover blockchain={blockchain} />
          </Fragment>
        )
      })()}
    </CardActions>
  </Card>
)

Wallet.defaultProps = {
  balance: 0,
  unconfirmedBalance: 0
}

Wallet.propTypes = {
  balance: T.number,
  blockchain: T.object,
  classes: T.object,
  isRegistered: T.bool,
  isRegistrationPending: T.bool,
  status: T.string,
  unconfirmedBalance: T.number
}

export default R.compose(
  withStyles(styles),
  withContainer
)(Wallet)
