import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import TextField from '@material-ui/core/TextField'
import withContainer from './container'

class CreateAchievement extends Component {
  state = {
    link: '',
    title: '',
    text: '',
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = async () => {
    const { link, title, text } = this.state
    const { isFBAuthenticatedAndWalletReady, createAchievement } = this.props
    isFBAuthenticatedAndWalletReady && createAchievement({ link, title, text })
    this.handleClose()
  }

  render () {
    const { isFBAuthenticatedAndWalletReady } = this.props
    const { link, modalOpen, title, text } = this.state
    return (
      <Modal
        size='tiny'
        trigger={
          <Button
            disabled={!isFBAuthenticatedAndWalletReady}
            basic
            onClick={this.handleOpen}
            color='green'
          >
            {isFBAuthenticatedAndWalletReady ? 'Create Achievement' : 'You need login and wallet to create an achievement'}
          </Button>
        }
        open={modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Create Achievement</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <TextField
                  fullWidth
                  id='link'
                  label="Link"
                  value={link}
                  onChange={this.handleChange('link')}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Form.Field>
              <Form.Field>
                <TextField
                  fullWidth
                  id='title'
                  label="Title"
                  value={title}
                  onChange={this.handleChange('title')}
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                />
              </Form.Field>
              <Form.Field>
                <TextField
                  fullWidth
                  id='text'
                  label="Text"
                  value={text}
                  onChange={this.handleChange('text')}
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

CreateAchievement.propTypes = {
  // createAchievementStatus: T.string,
  isFBAuthenticatedAndWalletReady: T.bool,
  createAchievement: T.func
}

export default withContainer(CreateAchievement)
