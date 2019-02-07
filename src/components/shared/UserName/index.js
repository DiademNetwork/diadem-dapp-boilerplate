import React from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import * as U from 'utils'
import withContainer from './container'
import LinkNetwork from 'components/specialized/LinkNetwork'

const UserName = ({ actor, loggedUserName, userAddress, userName }) => {
  userName = userName || U.actor.getUserName(actor)
  const isUser = U.actor.is(userAddress)(actor)
  switch (true) {
    case !!userName:
      return <span>{userName}</span>
    case !isUser:
      return <span>anonymous</span>
    case isUser && !!loggedUserName:
      return <span>{loggedUserName}</span>
    case isUser && !loggedUserName:
      return <span>anonymous <LinkNetwork /></span>
  }
}

UserName.propTypes = {
  actor: T.object,
  loggedUserName: T.string,
  userAddress: T.string,
  userName: T.string
}

export default R.compose(
  withContainer
)(UserName)
