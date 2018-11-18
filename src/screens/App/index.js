
import React from 'react'
import * as R from 'ramda'
import Nav from 'components/specialized/Nav'
import Wallet from 'components/specialized/Wallet'
import Tabs from 'components/specialized/Tabs'
import Achievements from 'components/specialized/Achievements'
import Timeline from 'components/specialized/Timeline'
import Users from 'components/specialized/Users'
import Notifications from 'components/specialized/Notifications'
import Help from 'components/specialized/Help'
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

const App = ({
  classes,
  hasUnreadAchievements,
  hasUnreadTransactions,
  userID,
  userDecentAddress
}) => (
  <div>
    <Nav />
    <Wallet className={classes.sm9} userID={userID} />
    <Tabs tabs={[
      {
        badgeContent: hasUnreadAchievements ? '!' : null,
        label: 'Achievements',
        component: <Achievements className={classes.sm9} userDecentAddress={userDecentAddress} />
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
    <Notifications />
    <Help />
  </div>
)

App.propTypes = {
  classes: T.object,
  hasUnreadAchievements: T.bool,
  hasUnreadTransactions: T.bool,
  userID: T.string,
  userDecentAddress: T.string
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(App)
