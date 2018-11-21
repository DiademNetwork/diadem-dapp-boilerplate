import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import User from './User'
import Button from './Button'
import network from 'configurables/network'

const Login = ({ isLogged, handleLoginSuccess }) => isLogged
  ? <User />
  : (
    <network.components.LoginButton
      onSuccess={(data) => handleLoginSuccess({ data })}
      buttonComponent={Button}
    />
  )

Login.propTypes = {
  handleLoginSuccess: T.func,
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(Login)
