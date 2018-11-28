import React from 'react'
import * as R from 'ramda'
import * as U from 'utils'
import { PropTypes as T } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import blockchains from 'configurables/blockchains'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Wallet from './Wallet'
import withContainer from './container'
import network from 'configurables/network'

const Wallets = ({ className, isLogged }) => (
  <Card className={className}>
    <CardContent>
      <Typography paragraph color="textSecondary">Your Diadem Network wallets</Typography>
      {isLogged ? (
        <Table>
          <TableBody>
            {U.mapObj(blockchain => <Wallet key={blockchain.name} blockchain={blockchain} />)(blockchains)}
          </TableBody>
        </Table>
      ) : (
        <Typography>You must be logged with {network.name} to use your wallet</Typography>
      )}
    </CardContent>
  </Card>
)

Wallets.propTypes = {
  className: T.string,
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(Wallets)
