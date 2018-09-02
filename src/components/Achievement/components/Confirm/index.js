import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Button } from 'semantic-ui-react'
import withContainer from './container'

class Confirm extends Component {
  handleConfirm = () => {
    const { target, fbInfo } = this.props
    const { accessToken, userID } = fbInfo
    this.props.confirmAchievement({
      target,
      token: accessToken,
      user: userID
    })
  }

  render () {
    const { fbInfo } = this.props
    return (
      <Button
        disabled={!fbInfo}
        onClick={this.handleConfirm}
      >
        {!fbInfo ? 'Confirm needs FB login' : 'Confirm'}
      </Button>
    )
  }
}

Confirm.propTypes = {
  fbInfo: T.object,
  target: T.string,
  confirmAchievement: T.func
}

export default withContainer(Confirm)
