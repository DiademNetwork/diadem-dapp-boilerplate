import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Item from './Item'

class Timeline extends Component {
  componentDidMount () {
    // remove new items badge from tabs when user navigates to transactions
    this.props.updateTransactionsMeta({ notificationCount: 0 })
  }

  render () {
    const {
      className,
      isFacebookAuthenticated,
      transactions
    } = this.props
    let renderedComponent
    if (!isFacebookAuthenticated) {
      renderedComponent = <Typography color="textPrimary">You must be logged with Facebook to see the timeline</Typography>
    } else if (transactions.length === 0) {
      renderedComponent = <Typography color="textPrimary">No item in timeline</Typography>
    } else {
      renderedComponent = (
        <List>
          {transactions.map((transaction, idx) => (
            <Item key={idx} transaction={transaction} />
          ))}
        </List>
      )
    }
    return (
      <Card className={className}>
        <CardContent>
          {renderedComponent}
        </CardContent>
      </Card>
    )
  }
}

Timeline.propTypes = {
  className: T.string,
  transactions: T.array,
  isFacebookAuthenticated: T.bool.isRequired,
  updateTransactionsMeta: T.func
}

export default withContainer(Timeline)
