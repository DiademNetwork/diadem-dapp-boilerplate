import '@babel/polyfill'
import './main.css'
import './reset.css'
import dotenv from 'dotenv'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { PropTypes as T } from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import Nav from './components/Nav'
import Wallet from './components/Wallet'
import ErrorBoundary from './components/ErrorBoundary'
import Tabs from './components/Tabs'
import Achievements from './components/Achievements'
import Timeline from './components/Timeline'
import Notifications from './components/Notifications'

dotenv.config()

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9863b0',
      main: '#84519c',
      dark: '#73418a',
      contrastText: '#fff'
    },
    secondary: {
      light: '#6B66AD',
      main: '#635fa2',
      dark: '#615D9E',
      contrastText: '#fff'
    }
  }
})

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
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Nav />
          <Grid className={classes.grid} container spacing={24} justify="center" alignContent="center">
            <Grid item xs={12} md={8}>
              <Wallet />
            </Grid>
            <Grid item xs={12} md={8}>
              <Tabs tabs={[
                { label: 'Achievements', component: <Achievements /> },
                { label: 'Timeline', component: <Timeline /> }
              ]} />
            </Grid>
          </Grid>
          <Notifications />
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: T.object.isRequired
}

const AppWithStyles = withStyles(styles)(App)

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <AppWithStyles />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
