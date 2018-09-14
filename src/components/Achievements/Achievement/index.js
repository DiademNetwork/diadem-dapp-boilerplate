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
    const { displayedHistoryItem: { object } } = this.state
    supportAchievement({ amount, link: object })
  }

  handleDeposit = ({ amount, witnessUserID }) => {
    const { depositForAchievement } = this.props
    const { displayedHistoryItem: { object } } = this.state
    depositForAchievement({ amount, link: object, witnessUserID })
  }

  hasUserAlreadyConfirmed = () => {
    const { displayedHistoryItem: { object } } = this.state
    const { userID, transactions } = this.props
    return R.compose(
      R.complement(R.isNil),
      R.find(R.both(
        R.propEq('actor', userID),
        R.propEq('object', object)
      )),
      R.filter(R.propEq('verb', 'confirm'))
    )(transactions)
  }

  getUniqueUsersNamesFor = verb => R.compose(
    (list) => {
      const nameKey = verb === 'confirm' ? 'witnessName' : 'name'
      return R.compose(
        R.uniq,
        R.map(R.prop(nameKey))
      )(list)
    },
    R.propOr([], verb)
  )

  getTotalAmountFor = verb => R.compose(
    R.reduce(
      (acc, curr) => R.add(acc, R.prop('amount', curr)),
      0
    ),
    R.propOr([], verb)
  )

  render () {
    const {
      classes,
      canUserConfirmCreateUpdateSupportDeposit,
      userID,
      walletBalance
    } = this.props
    const { displayedHistoryItem, stackedHistoryItems } = this.state
    const { actor, name, title, object } = displayedHistoryItem

    const uniqConfirmatorsNames = this.getUniqueUsersNamesFor('confirm')(displayedHistoryItem)
    const uniqSupportersNames = this.getUniqueUsersNamesFor('support')(displayedHistoryItem)
    const uniqDepositorsNames = this.getUniqueUsersNamesFor('deposit')(displayedHistoryItem)

    const confirmationsCount = R.length(uniqConfirmatorsNames)
    const supportsCount = R.length(uniqSupportersNames)
    const despositsCount = R.length(uniqDepositorsNames)

    const depositsTotalAmount = this.getTotalAmountFor('deposit')(displayedHistoryItem) / 1e8
    const supportsTotalAmount = this.getTotalAmountFor('support')(displayedHistoryItem) / 1e8

    return [
      <Card key="achievement-card" className={classes.card}>
        <CardHeader title={[
          <Typography key="achievement-actor" variant="subheading" color="textSecondary">{name} achieved:</Typography>,
          <Typography key="achievement-title" variant="headline">{title}</Typography>
        ]} />
        <Divider />
        <CardContent>
          {confirmationsCount > 0 ? (
            <Typography variant="body1" color="textSecondary">
              It has been confirmed by {R.head(uniqConfirmatorsNames)}{confirmationsCount - 1 > 0 ? ` and ${confirmationsCount - 1} others` : ''}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No Diadem Network user confirmed it yet
            </Typography>
          )}
          {supportsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              It has been supported by {R.head(uniqSupportersNames)}{supportsCount - 1 > 0 ? ` and ${supportsCount - 1} others` : ''} for a total amount of {supportsTotalAmount}
            </Typography>
          }
          {despositsCount > 0 &&
            <Typography variant="body1" color="textSecondary">
              {R.head(uniqDepositorsNames)}{despositsCount - 1 > 0 ? ` and ${despositsCount - 1} others have` : ' has'} made a deposit for a total amount of {depositsTotalAmount}
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
              actionAlreadyDone={this.hasUserAlreadyConfirmed()}
              className={classes.actionsButtons}
              canUserConfirmCreateUpdateSupportDeposit={canUserConfirmCreateUpdateSupportDeposit}
              link={object}
              name={name}
              onConfirm={this.handleConfirm}
              title={title}
            />
            <Support
              className={classes.actionsButtons}
              confirmationsCount={confirmationsCount}
              link={object}
              name={name}
              onSupport={this.handleSupport}
              walletBalance={walletBalance}
              title={title}
            />
            <Deposit
              className={classes.actionsButtons}
              link={object}
              name={name}
              onDeposit={this.handleDeposit}
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
              const confirmationsCount = R.length(this.getUniqueUsersNamesFor('confirm')(achievement))
              const supportsCount = R.length(this.getUniqueUsersNamesFor('support')(achievement))
              const despositsCount = R.length(this.getUniqueUsersNamesFor('deposit')(achievement))
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
  canUserConfirmCreateUpdateSupportDeposit: T.bool,
  userID: T.string,
  walletAddress: T.string,
  walletBalance: T.number,
  supportAchievement: T.func,
  transactions: T.array
}

export default withContainer(withStyles(styles)(Achievement))
