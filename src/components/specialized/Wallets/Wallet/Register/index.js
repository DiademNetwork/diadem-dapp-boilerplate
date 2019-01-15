import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Modal from 'components/shared/Modal'
import * as R from 'ramda'
import withContainer from './container'

class WalletRegister extends Component {
  handleConfirm = () => {
    const { blockchain, generateWallet } = this.props
    generateWallet({ blockchainKey: blockchain.key })
  }

  render () {
    const { blockchain, pending } = this.props
    const openButtonText = pending ? 'Waiting...' : 'Register'
    return (
      <Modal
        name={`${blockchain.name}-register-modal`}
        onConfirm={this.handleConfirm}
        openButtonText={openButtonText}
        disabled={pending}
        title={`Register to ${blockchain.name}`}
        render={() => (
          <Typography paragraph variant="body1">
            A {blockchain.name} wallet will be generated for you. Are you sure?
          </Typography>
        )}
      />
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
