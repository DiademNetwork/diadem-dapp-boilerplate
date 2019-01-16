import React from 'react'
import { PropTypes as T } from 'prop-types'
import Button from 'components/shared/Button'

const LoginButton = ({ name, onClick }) => (
  <Button
    data-qa-id="login-button"
    onClick={onClick}
  >
    Login
  </Button>
)

LoginButton.propTypes = {
  name: T.string,
  onClick: T.func
}

export default LoginButton
