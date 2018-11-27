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
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  }
})

const Wallets = ({ classes, className }) => (
  <Card className={className}>
    <CardContent>
      <Typography paragraph color="textSecondary">Your Diadem Network wallets</Typography>
      <Table>
        <TableBody>
          {U.mapObj(blockchain => (
            <TableRow key={name}>
              <TableCell component="th" scope="row">
                <Avatar
                  className={classes.img}
                  alt={`${blockchain.name} logo`}
                  src={blockchain.logo}
                />
                {blockchain.name}
              </TableCell>
              <TableCell>None</TableCell>
            </TableRow>
          ))(blockchains)}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

Wallets.propTypes = {
  classes: T.object,
  className: T.string
}

export default R.compose(
  withStyles(styles)
)(Wallets)
