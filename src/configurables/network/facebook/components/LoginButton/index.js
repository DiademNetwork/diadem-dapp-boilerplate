import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import withContainer from './container'
import Button from './Button'
import User from './User'
import facebookUser from 'stubs/facebook'

class FacebookLogin extends Component {
  onFacebookLogin = (data) => {
    this.props.handleFacebookLogin({ data })
  }

  render () {
    const { isFacebookLogged } = this.props
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
    return <Button
      onClick={() => this.onFacebookLogin(facebookUser)}
    />
  }
}

FacebookLogin.propTypes = {
  handleFacebookLogin: T.func,
  isFacebookLogged: T.bool
}

export default R.compose(
  withContainer
)(FacebookLogin)
