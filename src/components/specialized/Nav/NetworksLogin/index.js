import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import User from './User'
import networks from 'networks'

class NetworksLogin extends Component {
  render () {
    const { isLogged } = this.props
    if (isLogged) {
      return <User />
    } else {
      return (
        <Fragment>
          {networks.map(({ name, LoginButtonComponent }, idx) => (
            <LoginButtonComponent key={name} />
          ))}
        </Fragment>
      )
    }
  }
}

NetworksLogin.propTypes = {
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(NetworksLogin)
