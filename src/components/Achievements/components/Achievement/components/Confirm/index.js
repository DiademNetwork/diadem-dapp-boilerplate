import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Button } from 'semantic-ui-react'
import withContainer from './container'

class Confirm extends Component {
  handleConfirm = () => {
    const { accessToken, target, userID } = this.props
    this.props.confirmAchievement({
      target,
      token: accessToken,
      user: userID
    })
  }

  render () {
    const { isFBAuthenticated } = this.props
    return (
      <Button
        disabled={!isFBAuthenticated}
        onClick={this.handleConfirm}
      >
        {!isFBAuthenticated ? 'Confirm needs FB login' : 'Confirm'}
      </Button>
    )
  }
}

Confirm.propTypes = {
  accessToken: T.string,
  isFBAuthenticated: T.bool,
  userID: T.string,
  target: T.string,
  confirmAchievement: T.func
}

export default withContainer(Confirm)
