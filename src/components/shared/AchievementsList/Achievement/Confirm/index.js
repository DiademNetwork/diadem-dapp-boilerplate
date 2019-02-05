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
import * as U from 'utils'
import DoneIcon from '@material-ui/icons/Done'

class ConfirmAchievement extends Component {
  handleConfirm = () => {
    const { confirmAchievement, achievement, userAddress } = this.props
    confirmAchievement({
      userAddress,
      creatorAddress: U.achievement.getCreatorAddress(achievement),
      link: U.achievement.getLink(achievement)
    })
  }

  render () {
    const {
      achievement,
      isPrimaryWalletReady,
      idx,
      title,
      userAddress
    } = this.props
    const hasUserAlreadyConfirmed = U.achievement.hasAlready(userAddress)('confirm')(achievement)
    const { actor } = U.achievement.getActivities('create')(achievement)[0]
    return (
      <Modal
        confirmButtonText="Confirm"
        data-qa-id={`achievement-${idx}-confirm-modal`}
        disabled={hasUserAlreadyConfirmed || !isPrimaryWalletReady}
        name={`achievement-${idx}-confirm-button`}
        onConfirm={this.handleConfirm}
        openButtonIcon={<DoneIcon />}
        openButtonText={hasUserAlreadyConfirmed ? 'You confirmed already' : 'Confirm'}
        title="Confirm"
        render={() => (
          <DialogContentText component="div">
            <Typography paragraph variant="body1">
              Has <UserName actor={actor} /> really done achievement?<br /><br />
              {title}
            </Typography>
            <Link
              text={`View achievement post on ${network.name} again`}
              href={U.achievement.getLink(achievement)}
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
  achievement: T.object,
  confirmAchievement: T.func,
  idx: T.number,
  isPrimaryWalletReady: T.bool,
  title: T.string,
  userAddress: T.string
}

export default R.compose(
  withContainer
)(ConfirmAchievement)
