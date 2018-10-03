
import React, { Component } from 'react'
import * as R from 'ramda'
import Nav from '../../components/Nav'
import Wallet from '../../components/Wallet'
import Tabs from '../../components/Tabs'
import Achievements from '../../components/Achievements'
import Timeline from '../../components/Timeline'
import Users from '../../components/Users'
// import Notifications from '../../components/Notifications'
import Help from '../../components/Help'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  sm9: {
    width: '100%',
    margin: `${theme.spacing.unit} auto`,
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%'
    }
  }
})

class App extends Component {
  render () {
    const {
      classes,
      hasUnreadAchievements,
      hasUnreadTransactions,
      userID,
      userQtumAddress
    } = this.props
    return (
      <div>
        <Nav />
        <Wallet className={classes.sm9} userID={userID} />
        <Tabs tabs={[
          {
            badgeContent: hasUnreadAchievements ? '!' : null,
            label: 'Achievements',
            component: <Achievements className={classes.sm9} userQtumAddress={userQtumAddress} />
          },
          {
            badgeContent: hasUnreadTransactions ? '!' : null,
            label: 'Timeline',
            component: <Timeline className={classes.sm9} />
          },
          {
            label: 'Users',
            component: <Users className={classes.sm9} />
          }
        ]} />
        {/* <Notifications /> */}
        <Help />
      </div>
    )
  }
}

App.propTypes = {
  classes: T.object,
  hasUnreadAchievements: T.bool,
  hasUnreadTransactions: T.bool,
  userID: T.string,
  userQtumAddress: T.string
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(App)
