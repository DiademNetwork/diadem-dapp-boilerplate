import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Notifications from 'react-notification-system-redux'
import withContainer from './container'

class NotificationsWrapper extends Component {
  render () {
    const { notifications } = this.props

    const style = {
      NotificationItem: {
        DefaultStyle: {
          boxShadow: 'none',
          borderTop: 'none',
          color: '#FFF',
          fontSize: '1rem',
          fontWeight: 400,
          fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
          lineHeight: '1.5em',
          backgroundColor: '#84519c',
          margin: '10px 5px 2px 1px'
        },
        error: {
          backgroundColor: '#9c518f'
        }
      },
      Title: {
        DefaultStyle: {
          color: '#FFF'
        }
      },
      Dismiss: {
        DefaultStyle: {
          backgroundColor: '#84519c'
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
