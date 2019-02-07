import React from 'react'
import * as U from 'utils'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Wallet from './Wallet'
import blockchains from 'configurables/blockchains'

const Wallets = () => (
  <Card>
    <CardContent>
      <Table>
        <TableBody>
          {U.mapObj(blockchain => <Wallet key={blockchain.name} blockchain={blockchain} />)(blockchains.all)}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default Wallets
