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

const WalletGenerated = ({ mnemonic, onConfirm, privateKey }) => [
  <Typography key="title" variant="headline">Please save your mnemonic and privateKey</Typography>,
  <List key="list">
    <ListItem>
      <ListItemIcon>
        <AssignmentOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={mnemonic} />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <VpnKeyOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={privateKey} />
    </ListItem>
  </List>,
  <Button variant="contained" color="primary" onClick={onConfirm}>
    I have copied these info
  </Button>
]

WalletGenerated.propTypes = {
  mnemonic: T.string,
  onConfirm: T.func,
  privateKey: T.string
}

export default WalletGenerated
