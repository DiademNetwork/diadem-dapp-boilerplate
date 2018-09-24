import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import Item from './Item'
import withContainer from './container'

class Timeline extends Component {
  componentDidMount () {
    const { fetchTransactions, fetchStatus, suscribeToTransactions } = this.props
    if (fetchStatus === 'none') {
      fetchTransactions(1)
      suscribeToTransactions()
    }
  }

  render () {
    const {
      className,
      fetchStatus,
      fetchTransactions,
      hasMoreTransactions,
      transactions
    } = this.props
    return (
      <Card className={className}>
        <CardContent>
          <Typography paragraph color="textSecondary">Do not miss anything! Diadem network last activities:</Typography>
          {(transactions.length === 0) ? (
            <Typography color="textPrimary">
              {fetchStatus === 'requested' ? 'Loading...' : 'No item in timeline'}
            </Typography>
          ) : (
            <List>
              <InfiniteScroll
                pageStart={1}
                loadMore={fetchTransactions}
                hasMore={hasMoreTransactions}
                loader={<Typography key={0}>Loading....</Typography>}
              >
                {transactions.map((transaction, idx) => (
                  <Item key={idx} transaction={transaction} />
                ))}
              </InfiniteScroll>
            </List>
          )}
        </CardContent>
      </Card>
    )
  }
}

Timeline.propTypes = {
  className: T.string,
  fetchTransactions: T.func,
  fetchStatus: T.string,
  hasMoreTransactions: T.bool,
  transactions: T.array,
  suscribeToTransactions: T.func
}

export default withContainer(Timeline)
