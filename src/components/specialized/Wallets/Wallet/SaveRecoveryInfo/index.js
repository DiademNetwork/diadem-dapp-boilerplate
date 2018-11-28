import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ConfirmationModal from 'components/shared/ConfirmationModal'
import CopyToClipboardButton from 'components/shared/CopyToClipboardButton'
import * as R from 'ramda'
import withContainer from './container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'

class SaveRecoveryInfo extends Component {
  handleConfirm = () => {
    const { blockchain, infoSaved } = this.props
    infoSaved({ blockchainKey: blockchain.key })
  }

  render () {
    const { blockchain, mnemonic, privateKey } = this.props
    return (
      <ConfirmationModal
        name={`${blockchain.key}-recovery-info-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Save Recovery Info"
        confirmButtonText="I saved them somewhere safe"
        startsOpen
        noCancelButton
        maxWidth="lg"
        title={`Save ${blockchain.name} wallet recovery info!`}
      >
        <Typography variant="body1">
          Your mnemonic and privateKey will never be shown again.<br />
          Those are for the {blockchain.name} hot wallet which was just created for you for Diadem Network. <br />
          You will need them to recover your funds.
        </Typography>
        <List>
          <ListItem disableGutters divider dense>
            <ListItemIcon>
              <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={
              <Typography>
                {mnemonic}
                <CopyToClipboardButton
                  textToCopy={mnemonic}
                  name="mnemonic"
                  variant="icon"
                />
              </Typography>
            } />
          </ListItem>
          <ListItem disableGutters dense>
            <ListItemIcon>
              <VpnKeyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={
              <Typography>
                {privateKey}
                <CopyToClipboardButton
                  textToCopy={privateKey}
                  name="privateKey"
                  variant="icon"
                />
              </Typography>
            } />
          </ListItem>
        </List>
      </ConfirmationModal>
    )
  }
}

SaveRecoveryInfo.propTypes = {
  blockchain: T.object,
  infoSaved: T.func,
  mnemonic: T.string,
  privateKey: T.string
}

export default R.compose(
  withContainer
)(SaveRecoveryInfo)
