import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import withContainer from './container'

class UserName extends Component {
  static getUserAddress = R.prop('id')

  render () {
    const { actor, userAddress } = this.props
    return (
      <span>
        {R.prop('id')(actor) === userAddress ? 'you' : R.path(['data', 'userName'])(actor)}
      </span>
    )
  }
}

UserName.propTypes = {
  actor: T.object,
  userAddress: T.string
}

export default R.compose(
  withContainer
)(UserName)
