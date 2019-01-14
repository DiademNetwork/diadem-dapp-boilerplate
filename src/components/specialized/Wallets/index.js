import React, { Fragment } from 'react'
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
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import PaymentIcon from '@material-ui/icons/Payment'
import PeopleIcon from '@material-ui/icons/People'
import Login from '../Nav/Login'
import Update from '../Achievements/Update'
import Create from '../Achievements/Create'
import { withStyles } from '@material-ui/core'

const styles = (theme) => ({
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
})

const Wallets = ({ className, classes, createAchievement, updateAchievement }) => {
  return (
    <Fragment>
      <Card className={className}>
        <CardHeader title="Your cryptocurrency wallets" />
        <CardContent>
          <Table>
            <TableBody>
              {U.mapObj(blockchain => <Wallet key={blockchain.name} blockchain={blockchain} />)(blockchains.all)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className={className}>
        <CardHeader title="Your social profiles" />
        <CardContent>
          <Login />
        </CardContent>
      </Card>
      <Card className={className}>
        <CardHeader title="Send smart contract transaction" />
        <CardContent>
          <Create
            key="create"
            onCreate={createAchievement}
          />
          <Update
            key="update"
            onUpdate={updateAchievement}
            disabled={true}
          />
          <Button
            aria-label="Deposit"
            color="secondary"
            data-qa-id="deposit-reward-button"
            key="deposit-reward-button"
            variant="extendedFab"
            disabled={true}
          >
            <PaymentIcon className={classes.buttonIcon} />
            Deposit reward
          </Button>
          <Button
            aria-label="Challenge"
            color="secondary"
            data-qa-id="publish-challenge-button"
            key="publish-challenge-button"
            variant="extendedFab"
            disabled={true}
          >
            <PeopleIcon className={classes.buttonIcon} />
            Publish challenge
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  )
}

Wallets.propTypes = {
  className: T.string,
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(Wallets)
