import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import * as U from 'utils'
import withContainer from './container'

const UserName = ({ actor, userAddress }) => (
  <span>
    {console.log({ actor })}
    {U.actor.is(userAddress)(actor) ? 'you' : U.actor.getUserName(actor)}
  </span>
)

UserName.propTypes = {
  actor: T.object,
  userAddress: T.string
}

export default R.compose(
  withContainer
)(UserName)
