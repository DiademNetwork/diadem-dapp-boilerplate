import React, { Component } from 'react'
import { Container, Feed, Message } from 'semantic-ui-react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import * as R from 'ramda'
// import moment from 'moment'

class Timeline extends Component {
  refreshUserTransactions = () => {
    const { fetchUserTransactions, userID, isFBAuthenticated } = this.props
    isFBAuthenticated && fetchUserTransactions(userID)
  }

  componentDidMount () {
    this.refreshUserTransactions()
    this.refreshInterval = setInterval(this.refreshUserTransactions, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const { isFBAuthenticated } = this.props
    let renderedComponent
    if (!isFBAuthenticated) {
      renderedComponent = <Message warning>You must be logged with Facebook to see your timeline</Message>
    } else {
      renderedComponent = R.times((i) => (
        <Feed key={i}>
          <Feed.Event>
            <Feed.Label icon='user' />
            <Feed.Content>
              <Feed.Date>Today</Feed.Date>
              <Feed.Summary>
                {`Confirm ${i}`}
              </Feed.Summary>
              <Feed.Extra text>{`Alex did this and that for achievement ${i}`}</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      ), 10)
    }
    return (
      <Container>
        {renderedComponent}
      </Container>
    )
  }
}

Timeline.propTypes = {
  fetchUserTransactions: T.func.isRequired,
  // userTransactions: T.array,
  userID: T.string,
  isFBAuthenticated: T.bool.isRequired
}

export default withContainer(Timeline)
