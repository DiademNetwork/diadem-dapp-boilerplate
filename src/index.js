import '@babel/polyfill'
import './main.css'
import './reset.css'
import dotenv from 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ErrorBoundary from './components/ErrorBoundary'
import App from './screens/App'

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
