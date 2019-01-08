import React from 'react'
import { PropTypes as T } from 'prop-types'
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const FacebookLoginButton = ({ buttonComponent, onSuccess }) => (
  <ReactFacebookLogin
    appId={2107292709536080}
    fields="name,email,picture"
    callback={onSuccess}
    version="3.1"
    render={({ onClick }) => React.createElement(buttonComponent, {
      name: 'facebook',
      onClick
    }, null)}
  />
)

FacebookLoginButton.propTypes = {
  buttonComponent: T.func,
  onSuccess: T.func
}

export default FacebookLoginButton
