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
import Link from '../../Link'

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
    marginTop: theme.spacing.unit
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

  handleDeposit = ({ amount, witnessUserID }) => {
    const { depositForAchievement } = this.props
    const { displayedHistoryItem: { wallet, object } } = this.state
    depositForAchievement({ amount, wallet, link: object, witnessUserID })
  }

  isUserIn = listName => R.contains(
    this.props.userID,
    this.props.achievement[listName]
  )

  render () {
    const { achievement, classes, isFacebookAuthenticated, userID, walletBalance } = this.props
    const { displayedHistoryItem, stackedHistoryItems } = this.state
    const { confirmators, supporters, depositors } = achievement
    const { actor, name, title, object } = displayedHistoryItem
    const confirmationsCount = confirmators.length
    const supportsCount = supporters.length
    const despositsCount = depositors.length
    return [
      <Card key="achievement-card" className={classes.card}>
        <CardHeader title={[
          <Typography key="achievement-actor" variant="subheading" color="textSecondary">{name}:</Typography>,
          <Typography key="achievement-title" variant="headline">{title}</Typography>
        ]} />
        <Divider />
        <CardContent>
          {confirmationsCount > 0 ? (
            <Typography variant="body1" color="textSecondary">
              It has been confirmed by {confirmators[0]}{confirmationsCount - 1 > 0 ? ` and ${confirmationsCount - 1} others` : ''}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No Diadem Network user confirmed it yet
            </Typography>
          )}
          {supportsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              It has been supported by {supporters[0]}{supportsCount - 1 > 0 ? ` and ${supportsCount - 1} others` : ''}
            </Typography>
          }
          {despositsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              {depositors[0]}{despositsCount - 1 > 0 ? ` and ${despositsCount - 1} others have` : ' has'} made a deposit
            </Typography>
          }
          <Link
            className={classes.link}
            href={object}
            text="View achievement post on Facebook"
          />
        </CardContent>
        {actor !== userID ? (
          <CardActions
            className={classes.actions}
            disableActionSpacing
          >
            <Confirm
              actionAlreadyDone={this.isUserIn('confirmators')}
              className={classes.actionsButtons}
              isFacebookAuthenticated={isFacebookAuthenticated}
              link={object}
              name={name}
              onConfirm={this.handleConfirm}
              title={title}
            />
            <Support
              actionAlreadyDone={this.isUserIn('supporters')}
              className={classes.actionsButtons}
              confirmationsCount={confirmationsCount}
              name={name}
              onSupport={this.handleSupport}
              walletBalance={walletBalance}
              title={title}
            />
            <Deposit
              actionAlreadyDone={this.isUserIn('supporters')}
              className={classes.actionsButtons}
              name={name}
              onSupport={this.handleDeposit}
              walletBalance={walletBalance}
              title={title}
            />
          </CardActions>
        ) : (
          <CardActions
            className={classes.actions}
            disableActionSpacing
          >
            <Typography>This is your achievement</Typography>
          </CardActions>
        )}
      </Card>,
      stackedHistoryItems.length > 0 && (
        <ExpansionPanel key={`achievement-previous-history-items`}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>View previous achievements of {name}</Typography>
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
