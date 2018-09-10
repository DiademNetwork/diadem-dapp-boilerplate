import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import PlusOneIcon from '@material-ui/icons/PlusOneOutlined'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined'
import PermIdentityIcon from '@material-ui/icons/PermIdentityOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import moment from 'moment'

class Timeline extends Component {
  refreshUserTransactions = () => {
    const { fetchTransactions, isFacebookAuthenticated } = this.props
    isFacebookAuthenticated && fetchTransactions()
  }

  componentDidMount () {
    this.refreshUserTransactions()
    this.refreshInterval = setInterval(this.refreshUserTransactions, 5000)
  }

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  }

  render () {
    const { isFacebookAuthenticated, transactions } = this.props
    let renderedComponent
    if (!isFacebookAuthenticated) {
      renderedComponent = <Typography color="textPrimary">You must be logged with Facebook to see your timeline</Typography>
    } else if (transactions.length === 0) {
      renderedComponent = <Typography color="textPrimary">No item in timeline</Typography>
    } else {
      renderedComponent = (
        <List>
          {transactions.map((transaction, idx) => {
            let icon
            let action
            switch (transaction.verb) {
              case 'create':
                icon = <PlusOneIcon />
                action = 'created an achievement'
                break
              case 'confirm':
                icon = <ThumbUpIcon />
                action = 'confirmed an achievement'
                break
              case 'register':
                icon = <PermIdentityIcon />
                action = 'registered'
                break
              case 'withdraw':
              default:
                icon = <RemoveIcon />
                action = 'withdrew ??'
                break
            }
            return (
              <ListItem key={idx}>
                <Avatar>
                  {icon}
                </Avatar>
                <ListItemText
                  primary={`${transaction.actor} ${action}`}
                  secondary={moment(transaction.time).format('DD/MM/YYYY, h:mm:ss')}
                />
              </ListItem>
            )
          })}
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
  transactions: T.array,
  fetchTransactions: T.func.isRequired,
  isFacebookAuthenticated: T.bool.isRequired
}

export default withContainer(Timeline)
