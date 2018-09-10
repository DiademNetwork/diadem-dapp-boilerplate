import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import withContainer from './container'
import Confirm from './Confirm'
import Support from './Support'
import { withStyles } from '@material-ui/core/styles'

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
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

class Achievement extends Component {
  handleConfirm = () => {
    const {
      accessToken,
      achievement,
      confirmAchievement,
      userID,
      walletAddress
    } = this.props
    confirmAchievement({
      address: walletAddress,
      link: achievement.link,
      token: accessToken,
      user: userID
    })
  }

  handleSupport = (amount) => {
    const { achievement, supportAchievement } = this.props
    supportAchievement({
      amount,
      author: achievement.author
    })
  }

  render () {
    const { achievement, classes, isFacebookAuthenticated, walletBalance } = this.props
    const { title, actor, rewards, confirms, link } = achievement
    const confirmationsCount = confirms.length
    const rewardsCount = rewards.length
    const confirmatorPosition = getOrdinalSuffixOf(confirmationsCount + 1)
    const sponsorPosition = getOrdinalSuffixOf(rewardsCount + 1)
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography paragraph variant="headline"><strong>{actor}</strong> has <strong>{title}</strong></Typography>
          <Typography paragraph variant="subheading">
            This achievement has been confirmed {confirmationsCount} times and supported {rewardsCount} times!
          </Typography>
          <Typography
            className={classes.link}
            color="primary"
            component="a"
            href={link}
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
            text={`I want to be ${confirmatorPosition} confirmer`}
          />
          <Support
            className={classes.actionsButtons}
            onSupport={this.handleSupport}
            walletBalance={walletBalance}
            text={`I want to be ${sponsorPosition} sponsor`}
          />
        </CardActions>
      </Card>
    )
  }
}

Achievement.propTypes = {
  accessToken: T.string,
  achievement: T.object,
  confirmAchievement: T.func,
  classes: T.object,
  isFacebookAuthenticated: T.bool,
  userID: T.string,
  walletAddress: T.string,
  walletBalance: T.number,
  supportAchievement: T.func
}

export default withContainer(withStyles(styles)(Achievement))
