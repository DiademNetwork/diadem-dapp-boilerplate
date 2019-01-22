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
  handleFetchTransactions = (page) => {
    const { fetchStatus, fetch } = this.props
    if (fetchStatus !== 'requested') {
      fetch({ page })
    }
  }

  render () {
    const {
      className,
      fetchStatus,
      hasMore,
      timeline
    } = this.props
    return (
      <Card className={className}>
        <CardContent>
          <Typography paragraph color="textSecondary">Your last Diadem network activities:</Typography>
          {(timeline.length === 0) ? (
            <Typography>
              {fetchStatus === 'requested' ? 'Loading...' : 'You have no activity in timeline'}
            </Typography>
          ) : (
            <List>
              <InfiniteScroll
                pageStart={1}
                loadMore={this.handleFetchTransactions}
                hasMore={hasMore}
                loader={<Typography key={0}>Loading....</Typography>}
              >
                {timeline.map((item, idx) => (
                  <Item key={idx} item={item} />
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
  fetch: T.func,
  fetchStatus: T.string,
  hasMore: T.bool,
  timeline: T.array
}

export default withContainer(Timeline)
