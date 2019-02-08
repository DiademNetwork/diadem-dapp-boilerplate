
import React from 'react'
import * as R from 'ramda'
import Achievements from 'components/specialized/Achievements'
import Help from 'components/specialized/Help'
import Nav from 'components/specialized/Nav'
import Notifications from 'components/specialized/Notifications'
import SandboxConfigEditor from 'components/specialized/SandboxConfigEditor'
import Tabs from 'components/shared/Tabs'
import Timeline from 'components/specialized/Timeline'
import Wallets from 'components/specialized/Wallets'
import { Route, Switch } from 'react-router-dom'
import { PropTypes as T } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import withRouter from 'components/hocs/withRouter'
import StarIcon from '@material-ui/icons/Star'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import NotificationsIcon from '@material-ui/icons/Notifications'

const NoMatch = () => (
  <span>Page not found</span>
)

const styles = (theme) => ({
  sm9: {
    width: `calc(100% - ${2 * theme.spacing.unit})`,
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
  pushHistory,
  classes
}) => (
  <div>
    <Nav />
    <Tabs
      onChange={(path) => pushHistory(path)}
      tabs={[
        {
          label: 'Achievements',
          path: '/',
          icon: <StarIcon />
        },
        {
          label: 'Your funds',
          path: '/wallets',
          icon: <MoneyIcon />
        },
        {
          label: 'Notifications',
          path: '/notifications',
          icon: <NotificationsIcon />
        }
      ]}
    />
    <div className={classes.sm9}>
      <Switch>
        <Route exact path="/" component={Achievements} />
        <Route path="/wallets" component={Wallets} />
        <Route path="/notifications" component={Timeline} />
        <Route component={NoMatch} />
      </Switch>
    </div>
    <Notifications />
    <Help />
    {process.env.NODE_ENV === 'sandbox' && (
      <SandboxConfigEditor />
    )}
  </div>
)

App.propTypes = {
  classes: T.object,
  pushHistory: T.func
}

export default R.compose(
  withRouter,
  withStyles(styles)
)(App)
