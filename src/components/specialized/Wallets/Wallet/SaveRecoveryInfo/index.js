import React, { Component, Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Modal from 'components/shared/Modal'
import CopyToClipboardButton from 'components/shared/CopyToClipboardButton'
import * as R from 'ramda'
import withContainer from './container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'

class WalletSaveRecoveryInfo extends Component {
  handleConfirm = () => {
    const { blockchain, infoSaved } = this.props
    infoSaved({ blockchainKey: blockchain.key })
  }

  render () {
    const { blockchain, mnemonic, privateKey } = this.props
    return (
      <Modal
        name={`${blockchain.key}-recovery-info-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Save Recovery Info"
        confirmButtonText="I saved them somewhere safe"
        startsOpen
        noCancelButton
        maxWidth="lg"
        title={`Save your ${blockchain.name} wallet recovery info!`}
        render={() => (
          <Fragment>
            <Typography key="text" variant="body1">
              We just created for you a wallet to use on Diadem Network.
              Your mnemonic and privateKey below will never be shown again.<br />
              You will need them to recover your funds.
            </Typography>
            <List key="list">
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
          </Fragment>
        )}
      />
    )
  }
}

WalletSaveRecoveryInfo.propTypes = {
  blockchain: T.object,
  infoSaved: T.func,
  mnemonic: T.string,
  privateKey: T.string
}

export default R.compose(
  withContainer
)(WalletSaveRecoveryInfo)
