import React, { Component } from 'react'
import Nav from '../../components/Nav'
import Wallet from '../../components/Wallet'
import StreamFetcher from '../../components/StreamFetcher'
import Tabs from '../../components/Tabs'
import Achievements from '../../components/Achievements'
import Timeline from '../../components/Timeline'
import Notifications from '../../components/Notifications'
import Help from '../../components/Help'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  sm9: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      margin: 'auto'
    }
  },
  wallet: {
    marginBottom: theme.spacing.unit
  }
})

class App extends Component {
  render () {
    const {
      achievementsNotificationCount,
      classes,
      transactionsNotificationCount
    } = this.props
    return (
      <div>
        <Nav />
        <Wallet className={classes.wallet} />
        <Tabs tabs={[
          {
            badgeContent: achievementsNotificationCount,
            label: 'Achievements',
            component: <Achievements className={classes.sm9} />
          },
          {
            badgeContent: transactionsNotificationCount,
            label: 'Timeline',
            component: <Timeline className={classes.sm9} />
          }
        ]} />
        <Notifications />
        <Help />
        <StreamFetcher />
      </div>
    )
  }
}

App.propTypes = {
  achievementsNotificationCount: T.number,
  classes: T.object,
  transactionsNotificationCount: T.number
}

export default withContainer(withStyles(styles)(App))
