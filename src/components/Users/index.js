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
      users
    } = this.props
    return (
      <Card className={className}>
        <CardContent>
          <Typography paragraph color="textSecondary">All registered Diadem Network users</Typography>
          {(users.length === 0) ? (
            <Typography color="textPrimary">No user registered</Typography>
          ) : (
            <List>
              {users.map((user, idx) => (
                <Item key={idx} user={user} />
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}

Users.propTypes = {
  className: T.string,
  fetchUsers: T.func,
  users: T.array
}

export default withContainer(Users)
