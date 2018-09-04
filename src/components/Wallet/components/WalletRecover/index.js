import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField'
import withContainer from './container'

class WalletRecover extends Component {
  state = {
    mnemonic: '',
    modalOpen: true
  }

  componentWillReceiveProps ({ walletStatus: newWalletStatus }) {
    const { walletStatus } = this.props
    if (walletStatus === 'needs-recovering' && newWalletStatus === 'restored') {
      this.handleClose()
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = async () => {
    const { mnemonic } = this.state
    this.props.recoverWallet(mnemonic)
  }

  render () {
    return (
      <Modal
        size='tiny'
        trigger={
          <Button
            basic
            onClick={this.handleOpen}
            color='green'
          >
            Restore existing wallet
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Restore wallet</Modal.Header>
        <Modal.Content>
          <p>
            Please enter mnemonic you were asked to store when you created a Diadem network account
          </p>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <TextField
                  fullWidth
                  id='mnemonic'
                  label="Mnemonic"
                  value={this.state.mnemonic}
                  onChange={this.handleChange('mnemonic')}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

WalletRecover.propTypes = {
  recoverWallet: T.func.isRequired,
  walletStatus: T.string
}

export default withContainer(WalletRecover)
