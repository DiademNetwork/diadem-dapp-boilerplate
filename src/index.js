import '@babel/polyfill'
import './main.css'
import './reset.css'
import dotenv from 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ErrorBoundary from './components/shared/ErrorBoundary'
import App from 'screens/App'
import theme from './mui-theme'

dotenv.config()

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
