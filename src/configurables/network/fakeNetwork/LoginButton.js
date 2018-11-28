import React from 'react'
import { PropTypes as T } from 'prop-types'
import networkLoggedStub from 'stubs/network-logged'

const FakeLoginLoginButton = ({ buttonComponent, onSuccess }) =>
  React.createElement(buttonComponent, {
    name: 'Fake network',
    onClick: () => onSuccess(networkLoggedStub)
  }, null)

FakeLoginLoginButton.propTypes = {
  buttonComponent: T.func,
  onSuccess: T.func
}

export default FakeLoginLoginButton
