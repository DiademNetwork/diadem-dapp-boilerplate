import '@babel/polyfill'
import './main.css'
import './reset.css'
import dotenv from 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import { ConnectedRouter } from 'connected-react-router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import ErrorBoundary from './components/shared/ErrorBoundary'
import App from 'components/screens/App'
import theme from './mui-theme'

dotenv.config()

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundary>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MuiThemeProvider>
      </ErrorBoundary>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root-app'))
