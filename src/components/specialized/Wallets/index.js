import React from 'react'
import * as R from 'ramda'
import * as U from 'utils'
import { PropTypes as T } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Wallet from './Wallet'
import withContainer from './container'
import blockchains from 'configurables/blockchains'
import network from 'configurables/network'

const getWarningMessage = ({ areAllWalletsReady, isLogged }) => {
  if (!isLogged) { return `You must be logged with ${network.name} to use your wallet(s)` }
  if (!areAllWalletsReady) { return `All available wallet(s) need to be ready in order to use Diadem Network.` }
}

const Wallets = ({ areAllWalletsReady, className, isLogged }) => (
  <Card className={className}>
    <CardHeader title="Your Diadem Network wallet(s)" />
    {isLogged && (
      <CardContent>
        <Table>
          <TableBody>
            {U.mapObj(blockchain => <Wallet key={blockchain.name} blockchain={blockchain} />)(blockchains.all)}
          </TableBody>
        </Table>
      </CardContent>
    )}
    {(!isLogged || !areAllWalletsReady) && (
      <CardActions>
        <Typography color="primary">{getWarningMessage({ areAllWalletsReady, isLogged })}</Typography>
      </CardActions>
    )}
  </Card>
)

Wallets.propTypes = {
  areAllWalletsReady: T.bool,
  className: T.string,
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(Wallets)
