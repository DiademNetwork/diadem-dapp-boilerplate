import '@babel/polyfill'
import './main.css'
import './reset.css'
import * as R from 'ramda'
import dotenv from 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ErrorBoundary from './components/shared/ErrorBoundary'
import App from 'screens/App'
import theme from './mui-theme'
import { withSandboxConfigContextProvider } from 'components/contexts/SandboxConfig'

dotenv.config()

const Application = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ErrorBoundary>
  </Provider>
)

const WrapperdApplication = R.compose(
  process.env.ENV === 'sandbox' ? withSandboxConfigContextProvider : R.identity
)(Application)

ReactDOM.render(<WrapperdApplication />, document.getElementById('root-app'))
