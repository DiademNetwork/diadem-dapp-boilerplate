import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import withContainer from './container'
import Button from './Button'
import User from './User'
import facebookStub from '../../stubs/facebook'

class FacebookLogin extends Component {
  onFacebookLogin = (facebookData) => {
    if (!facebookData.userID) { // facebookLogin failed
      return
    }
    this.props.handleFacebookLogin(facebookData)
  }

  render () {
    return this.props.isFacebookAuthenticated ? (
      <User />
    ) : process.env.ENV !== 'mocked' ? (
      <ReactFacebookLogin
        appId={process.env.FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={this.onFacebookLogin}
        version="3.1"
        render={({ onClick }) => <Button onClick={onClick} />}
      />
    ) : (
      <Button onClick={() => this.props.handleFacebookLogin(facebookStub)} />
    )
  }
}

FacebookLogin.propTypes = {
  handleFacebookLogin: T.func,
  isFacebookAuthenticated: T.bool
}

export default R.compose(
  withContainer
)(FacebookLogin)
