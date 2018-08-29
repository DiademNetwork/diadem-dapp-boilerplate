import '@babel/polyfill'
import React from 'react'
import App from './components/App'
import ErrorBoundary from './components/ErrorBoundary'
import ReactDOM from 'react-dom'
import store from './store'
import { Provider } from 'react-redux'
import './reset.css'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root-app')
)
