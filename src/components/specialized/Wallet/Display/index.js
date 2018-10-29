import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Hidden from '@material-ui/core/Hidden'
import LocalPostOfficeOutlinedIcon from '@material-ui/icons/LocalPostOfficeOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import Zoom from '@material-ui/core/Zoom'
import Typography from '@material-ui/core/Typography'
import CopyToClipBoardButton from '../CopyToClipBoardButton'
import { withStyles } from '@material-ui/core/styles'
import HelpTooltip from 'components/shared/HelpTooltip'
import Withdraw from './Withdraw'
import truncateText from 'helpers/truncate-text'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import LinearProgress from '@material-ui/core/LinearProgress'
import withContainer from './container'

const styles = (theme) => ({
  withdraw: {
    marginLeft: theme.spacing.unit * 2
  },
  waitbox: {
    marginTop: theme.spacing.unit * 2,
    flexDirection: 'column'
  },
  progress: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 2,
    width: '100%',
    display: 'block'
  }
})

const CopyToAddressToolip = ({ address }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title='Copy address to clipboard'
  >
    <CopyToClipBoardButton variant="icon" textToCopy={address} name="address" />
  </Tooltip>
)

CopyToAddressToolip.propTypes = {
  address: T.string
}

const WalletDisplay = ({
  address,
  balance,
  classes,
  fullScreen,
  hasPendingTx,
  isRegistrationPending,
  unconfirmedBalance
}) => (
  <List>
    <ListItem divider>
      <ListItemIcon>
        <LocalPostOfficeOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary={
        <Typography>
          {fullScreen ? `${truncateText(address, 25, '...')}` : `${address}`}
          <Hidden xsDown>
            <HelpTooltip text="This is the first address of your hot Diadem Network wallet. Send tokens to it in order to be able to support and deposit for achievements" />
            <CopyToAddressToolip address={address} />
          </Hidden>
        </Typography>
      } />
    </ListItem>
    <ListItem divider={hasPendingTx}>
      <ListItemIcon>
        <MonetizationOnOutlinedIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography>
            {balance} QTUM{unconfirmedBalance !== 0 ? ` (${unconfirmedBalance} QTUM pending)` : ''}
            <Hidden xsDown>
              <HelpTooltip text={`This is your balance. Send QTUM token(s) to your hot Diadem Network wallet address ${address} to use in Diadem Network`} />
              {balance > 0 && (
                <Withdraw className={classes.withdraw} />
              )}
            </Hidden>
          </Typography>
        }
      />
    </ListItem>
    {(hasPendingTx || isRegistrationPending) && (
      <ListItem className={classes.waitbox}>
        <div className={classes.progress}>
          <LinearProgress color="secondary" />
        </div>
        <Typography color="textSecondary">
          {isRegistrationPending
            ? 'Your registration is still pending, it can take some minutes...You have to wait for it to be able to user Diadem Network'
            : 'You have blockchain transactions pending to be mined. Please wait, it can takes some minutes.'
          }
        </Typography>
      </ListItem>
    )}
    <Hidden key="mobile-button" smUp>
      <ListItem>
        <CopyToClipBoardButton variant="button" textToCopy={address} name="address" />
        {balance > 0 && (
          <Withdraw cxlassName={classes.withdraw} />
        )}
      </ListItem>
    </Hidden>
  </List>
)

WalletDisplay.propTypes = {
  address: T.string,
  balance: T.number,
  classes: T.object,
  fullScreen: T.bool,
  hasPendingTx: T.bool,
  isRegistrationPending: T.bool,
  unconfirmedBalance: T.number
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles),
  withContainer
)(WalletDisplay)
