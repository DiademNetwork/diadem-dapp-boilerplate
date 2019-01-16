import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Network from './Network'

const Networks = () => (
  <Card>
    <CardHeader title="Your social profiles" />
    <CardContent>
      <Table>
        <TableBody>
          <Network />
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

export default Networks
