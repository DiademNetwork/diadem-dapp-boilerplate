import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import withContainer from './container'
import TextField from '@material-ui/core/TextField'

class Support extends Component {
  state = {
    amount: 0,
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = e => {
    this.setState({ amount: e.target.value })
  }

  handleSubmit = async () => {
    const { amount } = this.state
    const { author, sendSupport, wallet } = this.props
    sendSupport({ wallet, author, amount })
    this.handleClose()
  }

  render () {
    const { author, title, walletInfo } = this.props
    const isBalancePositive = !!walletInfo && walletInfo.balance > 0
    return (
      <Modal
        size='tiny'
        trigger={
          <Button
            disabled={!isBalancePositive}
            basic
            onClick={this.handleOpen}
            color='green'
          >
            {isBalancePositive ? 'Support' : 'Support disabled while balance is null'}
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Support</Modal.Header>
        <Modal.Content>
          <p>
            Please enter an amount you would like to send to support author <strong>{author} </strong><br />
            for his achievement: <strong>{title}</strong>
          </p>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <TextField
                id='amount'
                label="Amount (in QTUM)"
                value={this.state.amount}
                onChange={this.handleChange}
                type='number'
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
              <Button disabled={this.state.amount <= 0} type='submit'>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

Support.propTypes = {
  author: T.string,
  title: T.string,
  wallet: T.object,
  walletInfo: T.object,
  sendSupport: T.func
}

export default withContainer(Support)
