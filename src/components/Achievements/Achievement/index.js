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
    const { achievement } = this.props
    this.setState({
      displayedHistoryItem: R.takeLast(1, achievement)[0],
      stackedHistoryItems: R.reverse(R.dropLast(1, achievement))
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

  isUserIn = verb => {
    const verbActors = R.prop(verb, this.state.displayedHistoryItem)
    if (!verbActors) {
      return false
    }
    const foundUser = R.find(R.propEq('actor', this.props.userID), verbActors)
    return !!foundUser
  }

  getActionsCounts = verb => R.compose(
    R.length,
    R.propOr([], verb)
  )

  render () {
    const {
      classes,
      isFacebookAuthenticatedAndWalletReady,
      userID,
      walletBalance
    } = this.props
    const { displayedHistoryItem, stackedHistoryItems } = this.state
    const { actor, confirm, support, deposit, name, title, object } = displayedHistoryItem
    const confirmationsCount = this.getActionsCounts('confirm')(displayedHistoryItem)
    const supportsCount = this.getActionsCounts('support')(displayedHistoryItem)
    const despositsCount = this.getActionsCounts('deposit')(displayedHistoryItem)
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
              It has been confirmed by {confirm[0].witnessName}{confirmationsCount - 1 > 0 ? ` and ${confirmationsCount - 1} others` : ''}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No Diadem Network user confirmed it yet
            </Typography>
          )}
          {supportsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              It has been supported by {support[0].witnessName}{supportsCount - 1 > 0 ? ` and ${supportsCount - 1} others` : ''}
            </Typography>
          }
          {despositsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              {deposit[0].witnessName}{despositsCount - 1 > 0 ? ` and ${despositsCount - 1} others have` : ' has'} made a deposit
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
              actionAlreadyDone={this.isUserIn('confirm')}
              className={classes.actionsButtons}
              isFacebookAuthenticatedAndWalletReady={isFacebookAuthenticatedAndWalletReady}
              link={object}
              name={name}
              onConfirm={this.handleConfirm}
              title={title}
            />
            <Support
              actionAlreadyDone={this.isUserIn('support')}
              className={classes.actionsButtons}
              confirmationsCount={confirmationsCount}
              name={name}
              onSupport={this.handleSupport}
              walletBalance={walletBalance}
              title={title}
            />
            <Deposit
              actionAlreadyDone={this.isUserIn('deposit')}
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
            {stackedHistoryItems.map((achievement, idx) => {
              const { title, object } = achievement
              const confirmationsCount = this.getActionsCounts('confirm')(achievement)
              const supportsCount = this.getActionsCounts('support')(achievement)
              const despositsCount = this.getActionsCounts('deposit')(achievement)
              return [
                <Typography
                  color="textPrimary"
                  key={`${idx}-title`}
                  variant="subheading"
                >
                  {title}
                </Typography>,
                <Typography
                  color="textSecondary"
                  key={`${idx}-confirm-support-deposit`}
                  variant="subheading"
                >
                  {`${confirmationsCount} confirmations, ${supportsCount} supports, ${despositsCount} deposits`}
                </Typography>,
                <Link
                  key={`${idx}-link`}
                  href={object}
                  text="View achievement post on Facebook"
                  typographyProps={{
                    paragraph: true
                  }}
                />
              ]
            })}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    ]
  }
}

Achievement.propTypes = {
  accessToken: T.string,
  achievement: T.array,
  confirmAchievement: T.func,
  classes: T.object,
  depositForAchievement: T.func,
  isFacebookAuthenticatedAndWalletReady: T.bool,
  userID: T.string,
  walletAddress: T.string,
  walletBalance: T.number,
  supportAchievement: T.func
}

export default withContainer(withStyles(styles)(Achievement))
