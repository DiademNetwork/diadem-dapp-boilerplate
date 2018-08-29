import React from 'react'
import { PropTypes as T } from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch () {
    this.setState({ hasError: true }) // TODO: handle error properly
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: T.node
}

export default ErrorBoundary
