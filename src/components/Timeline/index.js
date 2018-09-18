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
      transactions
    } = this.props
    return (
      <Card className={className}>
        <CardContent>
          <Typography paragraph color="textSecondary">Do not miss anything! Diadem network last activities:</Typography>
          {(transactions.length === 0) ? (
            <Typography color="textPrimary">No item in timeline</Typography>
          ) : (
            <List>
              {transactions.map((transaction, idx) => (
                <Item key={idx} transaction={transaction} />
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}

Timeline.propTypes = {
  className: T.string,
  transactions: T.array,
  updateTransactionsMeta: T.func
}

export default withContainer(Timeline)
