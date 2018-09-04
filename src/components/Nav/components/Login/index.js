import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'semantic-ui-react'
import withContainer from './container'

class Login extends Component {
  onFacebookLogin = (facebookData) => {
    this.props.handleFacebookLogin(facebookData)
  }

  render () {
    const { isFBAuthenticated, name } = this.props
    if (isFBAuthenticated) {
      return <p>{name}</p>
    }
    return (
      <FacebookLogin
        appId="2107292709536080"
        fields="name,email,picture"
        callback={this.onFacebookLogin}
        render={renderProps => (
          <Button
            color='blue'
            onClick={renderProps.onClick}
          >
            Login with Facebook
          </Button>
        )}
      />
    )
  }
}

Login.propTypes = {
  name: T.string,
  isFBAuthenticated: T.bool,
  handleFacebookLogin: T.func.isRequired
}

export default withContainer(Login)
