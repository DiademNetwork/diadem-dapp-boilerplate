import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import withContainer from './container'
import Confirm from './Confirm'
import Deposit from './Deposit'
import Support from './Support'
import { withStyles } from '@material-ui/core/styles'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import IconButton from '@material-ui/core/IconButton'
import copyToClipboard from '../../../services/copy-to-clipboard'

const getOrdinalSuffixOf = (i) => {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

const styles = (theme) => ({
  actions: {
    justifyContent: 'flex-end'
  },
  card: {
    padding: theme.spacing.unit
  },
  actionsButtons: {
    marginRight: theme.spacing.unit
  },
  iconButton: {
    color: theme.palette.secondary.light
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

class Achievement extends Component {
  state = {
    displayedHistoryItem: {},
    stackedHistoryItems: []
  }

  componentDidMount () {
    const { achievement: { history } } = this.props
    this.setState({
      displayedHistoryItem: R.takeLast(1, history)[0],
      stackedHistoryItems: R.dropLast(1, history)
    })
  }

  handleConfirm = () => {
    const { accessToken, confirmAchievement, userID, walletAddress } = this.props
    const { displayedHistoryItem: { object } } = this.state
    confirmAchievement({
      address: walletAddress,
      link: object,
      token: accessToken,
      user: userID
    })
  }

  handleSupport = (amount) => {
    const { supportAchievement } = this.props
    const { displayedHistoryItem: { wallet, object } } = this.state
    supportAchievement({ amount, wallet, link: object })
  }

  handleDeposit =({ amount, witnessUserID }) => {
    const { depositForAchievement } = this.props
    const { displayedHistoryItem: { wallet, object } } = this.state
    depositForAchievement({ amount, wallet, link: object, witnessUserID })
  }

  render () {
    const { achievement, classes, isFacebookAuthenticated, walletBalance } = this.props
    const { displayedHistoryItem, stackedHistoryItems } = this.state
    const { confirmsCount, depositsCount, supportsCount } = achievement
    return [
      <Card key="achievement-card" className={classes.card}>
        <CardHeader title={
          <Typography variant="headline"><strong>{displayedHistoryItem.actor}</strong> has <strong>{displayedHistoryItem.title}</strong></Typography>
        } />
        <CardContent>
          <Typography paragraph variant="subheading" color="textSecondary">
            Creator QTUM address: {displayedHistoryItem.wallet}
            <IconButton
              className={classes.iconButton}
              onClick={() => copyToClipboard(displayedHistoryItem.wallet)}
              aria-label="Copy"
              color="primary"
            >
              <FileCopyIcon />
            </IconButton>
          </Typography>
          <Typography variant="body1">
            This achievement has been confirmed {confirmsCount} times, supported {supportsCount} times, and {depositsCount} deposit(s) wait for confirmation
          </Typography>
          <Typography
            className={classes.link}
            color="primary"
            component="a"
            href={displayedHistoryItem.object}
            paragraph
            target="_blank"
            variant="body2"
          >
            View achievement post on Facebook
          </Typography>
        </CardContent>
        <CardActions
          className={classes.actions}
          disableActionSpacing
        >
          <Confirm
            className={classes.actionsButtons}
            onConfirm={this.handleConfirm}
            isFacebookAuthenticated={isFacebookAuthenticated}
            text={`I want to be ${getOrdinalSuffixOf(confirmsCount + 1)} confirmer`}
          />
          <Support
            className={classes.actionsButtons}
            onSupport={this.handleSupport}
            walletBalance={walletBalance}
            text={`I want to be ${getOrdinalSuffixOf(supportsCount + 1)} sponsor`}
          />
          <Deposit
            className={classes.actionsButtons}
            onSupport={this.handleDeposit}
            walletBalance={walletBalance}
            text="Deposit"
          />
        </CardActions>
      </Card>,
      stackedHistoryItems.length > 0 && (
        <ExpansionPanel key={`achievement-previous-history-items`}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Click to see past info of this achievement</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {stackedHistoryItems.map((historyItem, idx) => (
              <Typography
                key={idx}
                variant="subheading"
                color="textSecondary"
              >
                Title: {historyItem.title}<br />
                Link: {historyItem.object}
              </Typography>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    ]
  }
}

Achievement.propTypes = {
  accessToken: T.string,
  achievement: T.object,
  confirmAchievement: T.func,
  classes: T.object,
  depositForAchievement: T.func,
  isFacebookAuthenticated: T.bool,
  userID: T.string,
  walletAddress: T.string,
  walletBalance: T.number,
  supportAchievement: T.func
}

export default withContainer(withStyles(styles)(Achievement))
