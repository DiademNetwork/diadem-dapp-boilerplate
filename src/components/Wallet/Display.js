import React from 'react'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import Zoom from '@material-ui/core/Zoom'
import { Typography } from '@material-ui/core'
import CopyToClipBoardButton from './CopyToClipBoardButton'
import HelpTooltip from '../HelpTooltip'

const WalletDisplay = ({ address, balance }) => (
  <List>
    <ListItem>
      <ListItemIcon>
        <LocalPostOfficeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={
        <Typography>
          {address}
          <HelpTooltip text="This is the first address of your hot Diadem Network wallet" />
          <Tooltip
            TransitionComponent={Zoom}
            title='Copy address to clipboard'
          >
            <CopyToClipBoardButton text={address} />
          </Tooltip>
        </Typography>
      } />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <MonetizationOnOutlinedIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography>
            {`${balance} QTUM`}
            <HelpTooltip text={`This is your balance. Send QTUM token(s) to your hot Diadem Network wallet address ${address} to use in Diadem Network`} />
          </Typography>
        }
      />
    </ListItem>
  </List>
)

WalletDisplay.propTypes = {
  balance: T.number,
  address: T.string
}

export default WalletDisplay
