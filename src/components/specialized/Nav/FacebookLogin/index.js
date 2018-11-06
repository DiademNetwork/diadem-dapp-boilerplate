import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import withContainer from './container'
import Button from './Button'
import User from './User'
import {
  registeredUser,
  nonRegisteredUser,
  pendingRegistrationUser
} from 'stubs/facebook'
import { withSandboxConfigContextConsumer } from 'components/contexts/SandboxConfig'

class FacebookLogin extends Component {
  onFacebookLogin = (data) => {
    this.props.handleFacebookLogin({ data })
  }

  render () {
    const { isFacebookLogged, sandboxConfig } = this.props
    if (isFacebookLogged) {
      return <User />
    }
    if (process.env.ENV !== 'sandbox') {
      return (
        <ReactFacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={this.onFacebookLogin}
          version="3.1"
          render={({ onClick }) => <Button onClick={onClick} />}
        />
      )
    }
    const { isUserRegistered, isUserPendingRegistration } = sandboxConfig
    const facebookUserStub = isUserRegistered
      ? registeredUser
      : isUserPendingRegistration
        ? pendingRegistrationUser
        : nonRegisteredUser
    return <Button onClick={() => this.onFacebookLogin(facebookUserStub)} />
  }
}

FacebookLogin.propTypes = {
  handleFacebookLogin: T.func,
  isFacebookLogged: T.bool,
  sandboxConfig: T.object
}

FacebookLogin.defaultProps = {
  sandboxConfig: {}
}

export default R.compose(
  withContainer,
  process.env.ENV === 'sandbox' ? withSandboxConfigContextConsumer : R.identity
)(FacebookLogin)
