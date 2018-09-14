import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Item from './Item'

class Users extends Component {
  componentDidMount () {
    this.props.fetchUsers()
  }

  render () {
    const {
      className,
      isFacebookAuthenticated,
      users
    } = this.props
    let renderedComponent
    if (!isFacebookAuthenticated) {
      renderedComponent = <Typography color="textPrimary">You must be logged with Facebook to see the users</Typography>
    } else if (users.length === 0) {
      renderedComponent = <Typography color="textPrimary">No user registered</Typography>
    } else {
      renderedComponent = (
        <List>
          {users.map((user, idx) => (
            <Item key={idx} user={user} />
          ))}
        </List>
      )
    }
    return (
      <Card className={className}>
        <CardContent>
          <Typography paragraph color="textSecondary">All registered Diadem Network users</Typography>
          {renderedComponent}
        </CardContent>
      </Card>
    )
  }
}

Users.propTypes = {
  className: T.string,
  users: T.array,
  isFacebookAuthenticated: T.bool.isRequired,
  fetchUsers: T.func
}

export default withContainer(Users)
