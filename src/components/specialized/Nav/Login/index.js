import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import User from './User'
import Button from './Button'
import network from 'configurables/network'
import networkLoggedStub from 'stubs/network-logged'

const Login = ({ isLogged, handleLoginSuccess }) => {
  if (isLogged) {
    return (
      <User />
    )
  }
  if (process.env.ENV !== 'sandbox') {
    return (
      <network.components.LoginButton
        onSuccess={(data) => handleLoginSuccess({ data })}
        buttonComponent={Button}
      />
    )
  }
  return (
    <Button
      name='fake network'
      onClick={() => handleLoginSuccess({ data: networkLoggedStub })}
    />
  )
}

Login.propTypes = {
  handleLoginSuccess: T.func,
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(Login)
