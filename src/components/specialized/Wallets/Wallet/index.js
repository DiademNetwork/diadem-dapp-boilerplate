import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import withContainer from './container'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  }
})

const Wallet = ({ blockchain, classes, isRegistered }) => (
  <TableRow key={name}>
    <TableCell component="th" scope="row">
      <Avatar
        className={classes.img}
        alt={`${blockchain.name} logo`}
        src={blockchain.logo}
      />
      {blockchain.name}
    </TableCell>
    <TableCell>{isRegistered ? 'isRegistered' : 'FU'}</TableCell>
  </TableRow>
)

Wallet.propTypes = {
  blockchain: T.object,
  classes: T.object,
  isRegistered: T.bool
}

export default R.compose(
  withStyles(styles),
  withContainer
)(Wallet)
