import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'

import Notifications from 'react-notification-system-redux'

class NotificationsWrapper extends Component {
  render () {
    const { notifications } = this.props

    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          fontFamily: ['Lato', 'Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
          color: 'rgba(0,0,0,.85)',
          backgroundColor: '#FFF',
          margin: '10px 5px 2px 1px'
        }
      }
    }

    return (
      <Notifications
        notifications={notifications}
        style={style}
      />
    )
  }
}

NotificationsWrapper.propTypes = {
  notifications: T.array
}

export default withContainer(NotificationsWrapper)
