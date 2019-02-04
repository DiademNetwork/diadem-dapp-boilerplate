import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import * as U from 'utils'
import withContainer from './container'

const UserName = ({ actor, userAddress, userName }) => (
  <span>
    {userName || actor === 'Anonymous' ? 'Anonymous' : (U.actor.is(userAddress)(actor) ? 'you' : (U.actor.getUserNameOrAddress(actor)))}
  </span>
)

UserName.propTypes = {
  actor: T.oneOfType([T.object, T.string]),
  userAddress: T.string,
  userName: T.string
}

export default R.compose(
  withContainer
)(UserName)
