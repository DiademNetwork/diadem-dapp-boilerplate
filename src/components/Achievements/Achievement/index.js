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
import Divider from '@material-ui/core/Divider'
import withContainer from './container'
import Confirm from './Confirm'
import Deposit from './Deposit'
import Support from './Support'
import { withStyles } from '@material-ui/core/styles'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import IconButton from '@material-ui/core/IconButton'
import copyToClipboard from '../../../services/copy-to-clipboard'
import Link from '../../Link'
// import HelpTooltip from '../../HelpTooltip'

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
  panelDetails: {
    flexDirection: 'column'
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
    const { actor, title, wallet, object } = displayedHistoryItem
    return [
      <Card key="achievement-card" className={classes.card}>
        <CardHeader title={
          <Typography variant="headline">
            {actor} has {title}
          </Typography>
        } />
        <Divider />
        <CardContent>
          <Typography paragraph variant="subheading" color="textSecondary">
            Creator QTUM address: {wallet}
            <IconButton
              className={classes.iconButton}
              onClick={() => copyToClipboard(wallet)}
              aria-label="Copy"
              color="primary"
            >
              <FileCopyIcon />
            </IconButton>
          </Typography>
          <Typography variant="body1">
            This achievement has been confirmed {confirmsCount} times, supported {supportsCount} times, and {depositsCount} deposit(s) wait for confirmation
          </Typography>
          <Link
            href={object}
            text="View achievement post on Facebook"
          />
        </CardContent>
        <CardActions
          className={classes.actions}
          disableActionSpacing
        >
          <Confirm
            className={classes.actionsButtons}
            onConfirm={this.handleConfirm}
            actor={actor}
            link={object}
            title={title}
            isFacebookAuthenticated={isFacebookAuthenticated}
          />
          <Support
            className={classes.actionsButtons}
            onSupport={this.handleSupport}
            walletBalance={walletBalance}
          />
          <Deposit
            className={classes.actionsButtons}
            onSupport={this.handleDeposit}
            walletBalance={walletBalance}
          />
          {/* <HelpTooltip text="test" /> */}
        </CardActions>
      </Card>,
      stackedHistoryItems.length > 0 && (
        <ExpansionPanel key={`achievement-previous-history-items`}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Click here to see past related achievements from {actor}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            {stackedHistoryItems.map(({ actor, title, object }, idx) => [
              <Typography
                color="textSecondary"
                key={`${idx}-title`}
                variant="subheading"
              >
                {actor} did {title}
              </Typography>,
              <Link
                key={`${idx}-link`}
                href={object}
                text="View achievement post on Facebook"
                typographyProps={{
                  paragraph: true
                }}
              />
            ])}
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
