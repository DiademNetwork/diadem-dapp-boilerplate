import React from 'react'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import Zoom from '@material-ui/core/Zoom'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import copyToClipboard from '../../services/copy-to-clipboard'

const styles = (theme) => ({
  iconButton: {
    position: 'relative',
    bottom: '1px'
  },
  tooltipIcon: {
    cursor: 'pointer',
    color: theme.palette.primary.light,
    marginLeft: theme.spacing.unit * 2,
    position: 'relative',
    top: '7px'
  }
})

const WalletDisplay = ({ classes, address, balance }) => (

  <List>
    <ListItem>
      <ListItemIcon>
        <LocalPostOfficeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={
        <Typography>
          {address}
          <Tooltip
            TransitionComponent={Zoom}
            title={`This is the first address of your hot Diadem Network wallet`}
          >
            <HelpOutlineIcon className={classes.tooltipIcon} />
          </Tooltip>
          <Tooltip
            TransitionComponent={Zoom}
            title='Copy address to clipboard'
          >
            <IconButton
              className={classes.iconButton}
              onClick={() => copyToClipboard(address)}
              aria-label="Copy"
              color="primary"
            >
              <FileCopyIcon />
            </IconButton>
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
            <Tooltip
              TransitionComponent={Zoom}
              title={`This is your balance. Send QTUM token(s) to your hot Diadem Network wallet address ${address} to use in Diadem Network`}
            >
              <HelpOutlineIcon className={classes.tooltipIcon} />
            </Tooltip>
          </Typography>
        }
      />
    </ListItem>
  </List>
)

WalletDisplay.propTypes = {
  classes: T.object,
  balance: T.number,
  address: T.string
}

export default withStyles(styles)(WalletDisplay)
