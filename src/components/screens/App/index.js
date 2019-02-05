
import React from 'react'
import * as R from 'ramda'
import AllAchievements from 'components/specialized/Achievements/All'
import UserAchievements from 'components/specialized/Achievements/User'
import Help from 'components/specialized/Help'
import Nav from 'components/specialized/Nav'
import Notifications from 'components/specialized/Notifications'
import SandboxConfigEditor from 'components/specialized/SandboxConfigEditor'
import Tabs from 'components/shared/Tabs'
import Timeline from 'components/specialized/Timeline'
import Wallets from 'components/specialized/Wallets'
import Networks from 'components/specialized/Networks'
import Actions from 'components/specialized/Actions'
import { PropTypes as T } from 'prop-types'
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
  },
  space: {
    margin: `${theme.spacing.unit * 2} auto`
  }
})

const App = ({
  classes
}) => (
  <div>
    <Nav />
    <div className={classes.space} />
    <div className={classes.sm9}>
      <Wallets />
      <div className={classes.space} />
      <Networks />
      <div className={classes.space} />
      <Actions />
      <div className={classes.space} />
      <Tabs tabs={[
        {
          label: 'Achievements',
          component: <AllAchievements />
        },
        {
          label: 'Your achievements',
          component: <UserAchievements />
        },
        {
          label: 'Your timeline',
          component: <Timeline />
        }
      ]} />
    </div>
    <Notifications />
    <Help />
    {process.env.NODE_ENV === 'sandbox' && (
      <SandboxConfigEditor />
    )}
  </div>
)

App.propTypes = {
  classes: T.object
}

export default R.compose(
  withStyles(styles)
)(App)
