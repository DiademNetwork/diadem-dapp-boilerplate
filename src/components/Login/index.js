import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'semantic-ui-react'
import withContainer from './container'

class Login extends Component {
  onLogin = (fbInfo) => {
    this.props.storeFacebookInfo({ fbInfo })
  }

  render () {
    if (this.props.fbInfo) {
      return <p>{this.props.fbInfo.name}</p>
    }
    return (
      <FacebookLogin
        appId="2107292709536080"
        autoLoad
        fields="name,email,picture"
        callback={this.onLogin}
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
  fbInfo: T.object,
  storeFacebookInfo: T.func.isRequired
}

export default withContainer(Login)
