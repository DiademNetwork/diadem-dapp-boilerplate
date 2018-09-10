import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class UpdateAchievement extends Component {
  state = {
    link: '',
    modalOpen: false,
    previousLink: '',
    title: ''
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  handleSubmit = () => {
    const { onUpdate } = this.props
    const { link, title, previousLink } = this.state
    onUpdate({ link, previousLink, title })
    this.setState({ link: '', previousLink: '', title: '' })
    this.handleClose()
  }

  render () {
    const { link, modalOpen, previousLink, title } = this.state
    return [
      <Button
        color="secondary"
        key="update-achievement-button"
        variant="contained"
        onClick={this.handleClickOpen}
      >
        Update Achievement
      </Button>,
      <Dialog
        key='update-achievement-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update achievement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your previous achievement link, along with new title and link.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id='previousLink'
            label="Previous Facebook link of your achievement post"
            value={previousLink}
            onChange={this.handleChange('previousLink')}
            fullWidth
          />
          <TextField
            margin="dense"
            id='link'
            label="New Facebook link of your achievement post"
            value={link}
            onChange={this.handleChange('link')}
            fullWidth
          />
          <TextField
            margin="dense"
            id='title'
            label="Title for your achievement"
            value={title}
            onChange={this.handleChange('title')}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={title === '' || link === ''}
            onClick={this.handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

UpdateAchievement.propTypes = {
  onUpdate: T.func
}

export default UpdateAchievement
