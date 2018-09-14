import React from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import CopyToClipBoardButton from './CopyToClipBoardButton'
import HelpTooltip from '../HelpTooltip'

const WalletGenerated = ({ mnemonic, onConfirm, privateKey }) => [
  <Typography key="title" variant="headline">
    Please save your mnemonic and privateKey
    <HelpTooltip text="They will never be shown again. Those are for the hot wallet which was just created for you for Diadem Network. You will need them to recover your funds." />
  </Typography>,
  <List key="list">
    <ListItem>
      <ListItemIcon>
        <AssignmentOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={
        <Typography>{mnemonic} <CopyToClipBoardButton textToCopy={mnemonic} name="mnemonic" variant="icon" /></Typography>
      } />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <VpnKeyOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={
        <Typography>{privateKey} <CopyToClipBoardButton textToCopy={privateKey} name="privateKey" variant="icon" /></Typography>
      } />
    </ListItem>
  </List>,
  <Button
    key="button"
    variant="contained"
    color="secondary"
    onClick={onConfirm}
  >
    I saved my new hot wallet Mnemomic and PrivateKey somewhere safe
  </Button>
]

WalletGenerated.propTypes = {
  mnemonic: T.string,
  onConfirm: T.func,
  privateKey: T.string
}

export default WalletGenerated
