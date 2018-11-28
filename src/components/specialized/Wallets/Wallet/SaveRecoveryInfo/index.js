import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ConfirmationModal from 'components/shared/ConfirmationModal'
import * as R from 'ramda'
import withContainer from './container'

class SaveRecoveryInfo extends Component {
  handleConfirm = () => {
  }

  render () {
    const { blockchain, mnemonic, privateKey } = this.props
    return (
      <ConfirmationModal
        name={`${blockchain.name}-recovery-info-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Save Recovery Info"
        startsOpen
        noCancelButton
        title={`Save ${blockchain.name} wallet recovery info!`}
      >
        <Typography paragraph variant="body1">
          Mnemonic: {mnemonic} <br />
          PrivateKey: {privateKey}
        </Typography>
      </ConfirmationModal>
    )
  }
}

SaveRecoveryInfo.propTypes = {
  blockchain: T.object,
  mnemonic: T.string,
  privateKey: T.string
}

export default R.compose(
  withContainer
)(SaveRecoveryInfo)
