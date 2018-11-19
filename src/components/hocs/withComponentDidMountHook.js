import React, { Component } from 'react'

const withComponentDidMountHook = (WrappedComponent, onComponentDidMount) => class withPageOpenHandled extends Component {
  componentDidMount () {
    if (onComponentDidMount) {
      onComponentDidMount()
    }
  }

  render () {
    return (
      <WrappedComponent {...this.props}>
        {this.props.children}
      </WrappedComponent>
    )
  }
}

export default withComponentDidMountHook
