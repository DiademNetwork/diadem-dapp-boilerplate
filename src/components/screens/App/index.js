
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

const NoMatch = () => (
  <span>Page not found</span>
)

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
  pushHistory,
  classes
}) => (
  <div>
    <Nav />
    <div className={classes.space} />
    <div className={classes.sm9}>
      <Tabs
        onChange={(path) => pushHistory(path)}
        tabs={[
          {
            label: 'Achievements',
            path: '/',
            component: <Achievements />
          },
          {
            label: 'Your funds',
            path: '/wallets',
            component: <Wallets />
          },
          {
            label: 'Notifications',
            path: '/notifications',
            component: <Timeline />
          }
        ]}
      />
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
