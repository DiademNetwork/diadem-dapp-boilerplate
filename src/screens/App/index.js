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
import Grid from '@material-ui/core/Grid'
import withContainer from './container'

class App extends Component {
  render () {
    const { achievementsNotificationCount, transactionsNotificationCount } = this.props
    return (
      <div>
        <Grid
          container
          justify="center"
          alignContent="center"
          spacing={16}
        >
          <Grid item xs={12}>
            <Nav />
          </Grid>
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
        <Notifications />
        <Help />
        <StreamFetcher />
      </div>
    )
  }
}

App.propTypes = {
  achievementsNotificationCount: T.number,
  transactionsNotificationCount: T.number
}

export default withContainer(App)
