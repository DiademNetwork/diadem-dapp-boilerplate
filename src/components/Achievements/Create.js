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
import FacebookLinkHelp from './FacebookLinkHelp'

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit * 2
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
    const { classes } = this.props
    return [
      <Button
        className={classes.button}
        color="secondary"
        key="create-achievement-button"
        variant="contained"
        onClick={this.handleClickOpen}
      >
        Create Achievement
      </Button>,
      <Dialog
        key='create-achievement-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create achievement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an achievement, please provide the link to your achievement Facebook post and provide a title for it
          </DialogContentText>
          <FacebookLinkHelp />
          <TextField
            autoFocus
            margin="normal"
            id='link'
            label="Facebook link of your achievement post"
            value={link}
            onChange={this.handleChange('link')}
            placeholder='https://www.facebook.com/username/posts/postid'
            fullWidth
            helperText='Please copy full link'
          />
          <TextField
            margin="normal"
            id='title'
            label="Title for your achievement"
            value={title}
            onChange={this.handleChange('title')}
            placeholder='wrote the first chapter of my book'
            fullWidth
            helperText='I ..your title..'
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

CreateAchievement.propTypes = {
  classes: T.object,
  onCreate: T.func
}

export default withStyles(styles)(CreateAchievement)
