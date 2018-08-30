import '@babel/polyfill'
import React from 'react'
import Nav from './components/Nav'
import Challenges from './components/Challenges'
import ErrorBoundary from './components/ErrorBoundary'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import './reset.css'
import './main.css'
import 'semantic-ui-css/semantic.min.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <div>
        <Nav />
        <Challenges />
      </div>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
