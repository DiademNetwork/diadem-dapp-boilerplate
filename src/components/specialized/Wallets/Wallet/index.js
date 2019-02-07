import React, { Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Recover from './Recover'
import Register from './Register'
import Refund from './Refund'
import Withdraw from './Withdraw'
import SaveRecoveryInfo from './SaveRecoveryInfo'
import withContainer from './container'
import blockchains from 'configurables/blockchains'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  },
  button: {
    marginRight: theme.spacing.unit
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
  <TableRow key={name}>
    <TableCell component="th" scope="row">
      <Avatar
        className={classes.img}
        alt={`${blockchain.name} logo`}
        src={blockchain.logo}
      />
      {blockchain.name}
    </TableCell>
    {status === 'registration-failed' && (
      <TableCell>
        Registration failed. Please try later
      </TableCell>
    )}
    <TableCell align='right'>
      {(() => {
        if (status === 'is-generating') {
          return <Typography>Generating wallet...</Typography>
        }
        if (status === 'generated') {
          return <SaveRecoveryInfo blockchain={blockchain} />
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
    </TableCell>
    {!status !== 'registration-failed' && (
      <TableCell key="balance" align='right'>
        {`${balance} ${blockchains.get(blockchain.key).symbol}${unconfirmedBalance !== 0 ? ` (${unconfirmedBalance} pending)` : ''}`}
      </TableCell>
    )}
  </TableRow>
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
