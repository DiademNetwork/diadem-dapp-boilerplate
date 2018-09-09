import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  button: {
    marginTop: theme.spacing.unit * 2
  }
})

class CreateAchievement extends Component {
  state = {
    link: '',
    modalOpen: false,
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
    const { onCreate } = this.props
    const { link, title } = this.state
    onCreate({ link, title })
    this.setState({ link: '', title: '' })
    this.handleClose()
  }

  render () {
    const { link, modalOpen, title } = this.state
    const { classes, isDisabled } = this.props
    return [
      <Button
        className={classes.button}
        color="secondary"
        disabled={isDisabled}
        key="create-achievement-button"
        variant="contained"
        onClick={this.handleClickOpen}
      >
        {isDisabled ? 'You need to be logged and have your wallet ready to create an Achievement' : 'Create Achievement'}
      </Button>,
      <Dialog
        key='create-achievement-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide link and title for your achievement
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id='link'
            label="Facebook link of your achievement post"
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
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={title === '' || link === ''}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

CreateAchievement.propTypes = {
  classes: T.object,
  onCreate: T.func,
  isDisabled: T.bool
}

export default withStyles(styles)(CreateAchievement)
