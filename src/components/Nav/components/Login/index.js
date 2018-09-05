import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Button, Image } from 'semantic-ui-react'
import withContainer from './container'

class Login extends Component {
  onFacebookLogin = (facebookData) => {
    if (!facebookData.userID) { // facebookLogin failed
      return
    }
    this.props.handleFacebookLogin(facebookData)
  }

  render () {
    const { isFBAuthenticated, name, picture } = this.props
    if (isFBAuthenticated) {
      return (
        <p style={{ lineHeight: '35px' }}>
          <Image src={picture.data.url} size='mini' circular floated='left' /> {name}
        </p>
      )
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
  picture: T.object,
  isFBAuthenticated: T.bool,
  handleFacebookLogin: T.func.isRequired
}

export default withContainer(Login)
