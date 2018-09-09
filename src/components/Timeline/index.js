import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

class Timeline extends Component {
  refreshUserTransactions = () => {
    const { fetchUserTransactions, userID, isFacebookAuthenticated } = this.props
    isFacebookAuthenticated && fetchUserTransactions(userID)
  }

  componentDidMount () {
    this.refreshUserTransactions()
    this.refreshInterval = setInterval(this.refreshUserTransactions, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const { isFacebookAuthenticated } = this.props
    let renderedComponent
    if (!isFacebookAuthenticated) {
      renderedComponent = <Typography color="textPrimary">You must be logged with Facebook to see your timeline</Typography>
    } else {
      renderedComponent = (
        <List>
          {R.times((i) => (
            <ListItem key={i}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          ), 10)}
        </List>
      )
    }
    return (
      <Card>
        <CardContent>
          {renderedComponent}
        </CardContent>
      </Card>
    )
  }
}

Timeline.propTypes = {
  fetchUserTransactions: T.func.isRequired,
  userID: T.string,
  isFacebookAuthenticated: T.bool.isRequired
}

export default withContainer(Timeline)
