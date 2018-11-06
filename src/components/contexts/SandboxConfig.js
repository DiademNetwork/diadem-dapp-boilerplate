import React, { Component } from 'react'

const initialSandboxConfig = {
  isUserRegistered: true,
  isUserPendingRegistration: false
}

const SandboxConfigContext = React.createContext({ config: initialSandboxConfig })

export const withSandboxConfigContextProvider = (WrappedComponent) => class withSandboxConfigContextProvider extends Component {
  state = initialSandboxConfig

  onChangeSandboxConfig = (name, value) => this.setState({
    [name]: value
  })

  render () {
    return (
      <SandboxConfigContext.Provider
        value={{
          sandboxConfig: { ...this.state },
          onChangeSandboxConfig: this.onChangeSandboxConfig
        }}
      >
        <WrappedComponent {...this.props}>
          {this.props.children}
        </WrappedComponent>
      </SandboxConfigContext.Provider>
    )
  }
}

export const withSandboxConfigContextConsumer = (WrappedComponent) => class withSandboxConfigContextConsumer extends Component {
  render () {
    return (
      <SandboxConfigContext.Consumer>
        {(sandboxConfigContext) => (
          <WrappedComponent
            {...this.props}
            {...sandboxConfigContext}
          >
            {this.props.children}
          </WrappedComponent>
        )}
      </SandboxConfigContext.Consumer>
    )
  }
}
