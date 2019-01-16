import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import * as U from 'utils'
import withContainer from './container'

const UserName = ({ actor, userAddress, userName }) => (
  <span>
    {userName || (U.actor.is(userAddress)(actor) ? 'you' : U.actor.getUserName(actor))}
  </span>
)

UserName.propTypes = {
  actor: T.object,
  userAddress: T.string,
  userName: T.string
}

export default R.compose(
  withContainer
)(UserName)
