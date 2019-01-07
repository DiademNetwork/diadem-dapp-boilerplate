
import React from 'react'
import * as R from 'ramda'
import Achievements from 'components/specialized/Achievements'
import Help from 'components/specialized/Help'
import Nav from 'components/specialized/Nav'
import Notifications from 'components/specialized/Notifications'
import SandboxConfigEditor from 'components/specialized/SandboxConfigEditor'
import Tabs from 'components/shared/Tabs'
import Wallets from 'components/specialized/Wallets'
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
  achievementsOpenned,
  classes,
  hasUnreadAchievements
}) => (
  <div>
    <Nav />
    <Wallets className={classes.sm9} />
    <Tabs tabs={[
      {
        badgeContent: hasUnreadAchievements ? '!' : null,
        label: 'Achievements',
        onOpen: achievementsOpenned,
        component: <Achievements className={classes.sm9} />
      }
    ]} />
    <Notifications />
    <Help />
    {process.env.ENV === 'sandbox' && (
      <SandboxConfigEditor />
    )}
  </div>
)

App.propTypes = {
  classes: T.object,
  hasUnreadAchievements: T.bool,
  achievementsOpenned: T.func
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(App)
