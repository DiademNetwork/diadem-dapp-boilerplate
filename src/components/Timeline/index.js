import React, { Component } from 'react'
import { Container, Message } from 'semantic-ui-react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'

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
    const { userTransactions, isFBAuthenticated } = this.props
    let renderedComponent
    if (!isFBAuthenticated) {
      renderedComponent = <Message warning>You must be logged with Facebook to see your timeline</Message>
    } else {
      renderedComponent = userTransactions.map(() => (
        <p>Timeline item</p>
      ))
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
  userTransactions: T.array,
  userID: T.string,
  isFBAuthenticated: T.bool.isRequired
}

export default withContainer(Timeline)
