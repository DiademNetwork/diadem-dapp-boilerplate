import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import ConfirmationModal from 'components/shared/ConfirmationModal'
import * as R from 'ramda'
import withContainer from './container'

class WalletRegister extends Component {
  handleConfirm = () => {
    const { blockchain, generateWallet } = this.props
    generateWallet({ blockchainKey: blockchain.key })
  }

  render () {
    const { blockchain } = this.props
    return (
      <ConfirmationModal
        name={`${blockchain.name}-register-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Register"
        title={`Register to ${blockchain.name}`}
      >
        <Typography paragraph variant="body1">
          A {blockchain.name} wallet will be generated for you. Are you sure?
        </Typography>
      </ConfirmationModal>
    )
  }
}

WalletRegister.propTypes = {
  blockchain: T.object,
  generateWallet: T.func
}

export default R.compose(
  withContainer
)(WalletRegister)
