import React, { Component } from 'react'
import Nav from '../../components/Nav'
import Wallet from '../../components/Wallet'
import StreamFetcher from '../../components/StreamFetcher'
import Tabs from '../../components/Tabs'
import Achievements from '../../components/Achievements'
import Timeline from '../../components/Timeline'
import Notifications from '../../components/Notifications'
import Help from '../../components/Help'
import Footer from '../../components/Footer'
import { PropTypes as T } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import withContainer from './container'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    padding: `${theme.spacing.unit * 2} 0`,
    width: '100%'
  }
})

class App extends Component {
  render () {
    const { achievementsNotificationCount, classes, transactionsNotificationCount } = this.props
    return (
      <div className={classes.root}>
        <Nav />
        <Grid className={classes.grid} container spacing={24} justify="center" alignContent="center">
          <Grid item xs={12} md={8}>
            <Wallet />
          </Grid>
          <Grid item xs={12} md={8}>
            <Tabs tabs={[
              {
                badgeContent: achievementsNotificationCount,
                label: 'Achievements',
                component: <Achievements />
              },
              {
                badgeContent: transactionsNotificationCount,
                label: 'Timeline',
                component: <Timeline />
              }
            ]} />
          </Grid>
        </Grid>
        <Footer />
        <Notifications />
        <Help />
        <StreamFetcher />
      </div>
    )
  }
}

App.propTypes = {
  achievementsNotificationCount: T.number,
  classes: T.object.isRequired,
  transactionsNotificationCount: T.number
}

export default withContainer(withStyles(styles)(App))
