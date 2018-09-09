import React from 'react'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'

const WalletDisplay = ({ address, balance }) => (
  <List>
    <ListItem>
      <ListItemIcon>
        <LocalPostOfficeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={`Address: ${address}`} />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <MonetizationOnOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={`Balance: ${balance} QTUM`} />
    </ListItem>
  </List>
)

WalletDisplay.propTypes = {
  balance: T.number,
  address: T.string
}

export default WalletDisplay
