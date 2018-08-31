import '@babel/polyfill'
import React from 'react'
import Nav from './components/Nav'
import Wallet from './components/Wallet'
import Challenges from './components/Challenges'
import ErrorBoundary from './components/ErrorBoundary'
import { Divider } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './reset.css'
import './main.css'
import 'semantic-ui-css/semantic.min.css'
import store from './store'

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
        <Challenges />
      </div>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
