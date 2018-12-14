import React, { Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Recover from './Recover'
import Register from './Register'
import SaveRecoveryInfo from './SaveRecoveryInfo'
import CopyToClipboardButton from 'components/shared/CopyToClipboardButton'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import withContainer from './container'
import blockchains from 'configurables/blockchains'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  }
})

const CopyToAddressToolip = ({ address }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title='Copy address to clipboard'
  >
    <CopyToClipboardButton variant="icon" textToCopy={address} name="address" />
  </Tooltip>
)

CopyToAddressToolip.propTypes = {
  address: T.string
}

const Wallet = ({
  address,
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
    {!status !== 'registration-failed' && (
      <Fragment>
        <TableCell key="address">
          {address ? (<span>{address} <CopyToAddressToolip address={address} /></span>) : ''}
        </TableCell>
        <TableCell key="balance">
          {`${balance} ${blockchains[blockchain.key].symbol}${unconfirmedBalance !== 0 ? ` (${unconfirmedBalance} pending)` : ''}`}
        </TableCell>
      </Fragment>
    )}
    <TableCell numeric>`
      {(() => {
        if (status === 'generated') {
          return <SaveRecoveryInfo blockchain={blockchain} />
        }
        if (status === 'no-private-key' || status === 'address-not-matching') {
          return <Recover blockchain={blockchain} />
        }
        if (!isRegistered && !isRegistrationPending && status !== 'registration-failed' && status !== 'initial') {
          return <Register blockchain={blockchain} />
        }
      })()}
    </TableCell>
  </TableRow>
)

Wallet.defaultProps = {
  balance: 0,
  unconfirmedBalance: 0
}

Wallet.propTypes = {
  address: T.string,
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
