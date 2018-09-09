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

const styles = (theme) => ({
  actions: {
    justifyContent: 'flex-end'
  },
  card: {
    padding: theme.spacing.unit
  },
  actionsButtons: {
    marginRight: theme.spacing.unit
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
    const { title, author, rewards, confirms, link } = achievement
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline">{title}</Typography>
          <Typography paragraph variant="subheading" color="textSecondary">
            Author: {author}
          </Typography>
          <Typography paragraph>Rewards: {rewards.length}</Typography>
          <Typography paragraph>Confirms: {confirms.length}</Typography>
          <Typography
            paragraph
            target="_blank"
            href={link}
            component="a"
            color="primary"
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
          />
          <Support
            className={classes.actionsButtons}
            onSupport={this.handleSupport}
            walletBalance={walletBalance}
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
