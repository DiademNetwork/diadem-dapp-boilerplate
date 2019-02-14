import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import Button from './Button'
import network from 'configurables/network'

const Network = ({ isLogged, handleLoginSuccess }) => {
  return isLogged ? null : (
    <network.components.LoginButton
      onSuccess={(data) => {
        handleLoginSuccess({
          data: {
            userID: R.path(network.dataPaths.userID)(data),
            userName: R.path(network.dataPaths.userName)(data),
            userAccessToken: R.path(network.dataPaths.userAccessToken)(data),
            userPictureUrl: R.path(network.dataPaths.userPictureUrl)(data)
          }
        })
      }}
      buttonComponent={Button}
    />
  )
}

Network.propTypes = {
  handleLoginSuccess: T.func,
  isLogged: T.bool
}

export default R.compose(
  withContainer
)(Network)
