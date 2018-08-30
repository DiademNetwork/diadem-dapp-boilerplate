import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button } from 'semantic-ui-react'

export default class Login extends Component {
  state = {
    user: null
  }

  onLogin = ({ name }) => { // accessToken can be found here too if needed
    this.setState({ user: name })
  }

  render () {
    if (this.state.user) {
      return <p>{this.state.user}</p>
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
