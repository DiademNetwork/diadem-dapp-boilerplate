import '@babel/polyfill'
import dotenv from 'dotenv'
import React from 'react'
import Nav from './components/Nav'
import Wallet from './components/Wallet'
import Achievements from './components/Achievements'
import ErrorBoundary from './components/ErrorBoundary'
import { Divider } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './reset.css'
import './main.css'
import 'semantic-ui-css/semantic.min.css'
import store from './store'

dotenv.config()

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <div>
        <Nav />
        <Divider />
        <Wallet />
        <Divider />
        <Achievements />
      </div>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
