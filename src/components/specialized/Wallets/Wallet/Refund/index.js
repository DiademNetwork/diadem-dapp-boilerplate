import React, { Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Modal from 'components/shared/Modal'
import CopyToClipboardButton from 'components/shared/CopyToClipboardButton'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import withContainer from './container'
import * as R from 'ramda'

const CopyToAddressToolip = ({ address }) => (
  <Tooltip
    TransitionComponent={Zoom}
    title='Copy address to clipboard'
  >
    <CopyToClipboardButton variant="icon" textToCopy={address} name="address" />
  </Tooltip>
)

CopyToAddressToolip.propTypes = {
  address: T.string
}

const WalletRefund = ({ address, blockchain }) => (
  <Modal
    name={`${blockchain.key}-refund-modal`}
    openButtonText="Refund"
    confirmButtonText="Ok"
    noCancelButton
    maxWidth="md"
    title={`Send tokens to your ${blockchain.name} wallet`}
    render={() => (
      <Fragment>
        <Typography key="text" variant="body1">
          To refund your {blockchain.name} wallet,<br />
          you need to send tokens to your wallet address:
        </Typography>
        <span>{address} <CopyToAddressToolip address={address} /></span>
      </Fragment>
    )}
  />
)

WalletRefund.propTypes = {
  address: T.string,
  blockchain: T.object
}

export default R.compose(
  withContainer
)(WalletRefund)
