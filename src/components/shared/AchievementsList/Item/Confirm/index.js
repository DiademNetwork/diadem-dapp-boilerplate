import React, { Component} from 'react'
import * as R from 'ramda'
import network from 'configurables/network'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import DialogContentText from '@material-ui/core/DialogContentText'
import withContainer from './container'
import Modal from 'components/shared/Modal'
import Link from 'components/shared/Link'
import UserName from 'components/shared/UserName'

class ConfirmAchievement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasConfirmedAlready: this.hasUserAlreadyConfirmed(props.achievement),
      creatorAddress: R.prop('id')(this.getCreationActivity(props.achievement.activities))
    }
  }

  hasUserAlreadyConfirmed = () => false

  handleConfirm = () => {
    const { accessToken, confirmAchievement, achievement, userID, userAddress } = this.props
    const { creatorAddress } = this.state
    confirmAchievement({
      userAddress: userAddress,
      creatorAddress,
      link: achievement.group,
      token: accessToken,
      user: userID
    })
  }

  getCreationActivity = R.compose(
    R.head,
    R.filter(R.propEq('verb', 'create'))
  )

  render () {
    const {
      achievement,
      canPerformActions,
      idx,
      link,
      title
    } = this.props
    const { hasConfirmedAlready } = this.state
    const { actor } = this.getCreationActivity(achievement.activities)
    return (
      <Modal
        confirmButtonText="Confirm"
        data-qa-id={`achievement-${idx}-confirm-modal`}
        disabled={hasConfirmedAlready || !canPerformActions}
        name={`achievement-${idx}-confirm-button`}
        onConfirm={this.handleConfirm}
        openButtonText={hasConfirmedAlready ? 'You confirmed already' : 'Confirm'}
        title="Confirm"
        render={() => (
          <DialogContentText component="div">
            <Typography paragraph variant="body1">
              Has <UserName actor={actor} /> really done achievement?<br /><br />
              {title}
            </Typography>
            <Link
              text={`View achievement post on ${network.name} again`}
              href={link}
              typographyProps={{
                paragraph: true
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Confirmations make other Diadem Network users know they support real achievement(s)<br />
              Please confirm only achievement(s) you are sure of
            </Typography>
          </DialogContentText>
        )}
      />
    )
  }
}

ConfirmAchievement.propTypes = {
  canPerformActions: T.bool,
  achievement: T.object,
  accessToken: T.string,
  confirmAchievement: T.func,
  idx: T.number,
  link: T.string,
  title: T.string,
  userID: T.string,
  userAddress: T.string
}

export default R.compose(
  withContainer
)(ConfirmAchievement)
