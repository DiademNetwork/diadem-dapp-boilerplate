import React, { Component } from 'react'
import * as R from 'ramda'
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
import isUrl from 'is-url'

const LINK_INITIAL_VALUE = ''
const TITLE_INITIAL_VALUE = ''

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit * 2
  }
})

class CreateAchievement extends Component {
  state = {
    isLinkValid: false,
    isTitleValid: false,
    link: LINK_INITIAL_VALUE,
    modalOpen: false,
    title: TITLE_INITIAL_VALUE
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'link') {
      const isLinkValid = this.isFacebookLinkValid(value)
      this.setState({ link: value, isLinkValid })
    } else if (name === 'title') {
      const isTitleValid = value.length > 0
      this.setState({ title: value, isTitleValid })
    }
  }

  isFacebookLinkValid = R.allPass([
    R.is(String),
    isUrl,
    R.test(/.*facebook.*/)
  ])

  handleSubmit = () => {
    const { onCreate } = this.props
    const { link, title } = this.state
    onCreate({ link, title })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    isLinkValid: false,
    isTitleValid: false,
    link: LINK_INITIAL_VALUE,
    title: TITLE_INITIAL_VALUE
  })

  render () {
    const { isLinkValid, isTitleValid, link, modalOpen, title } = this.state
    const { classes } = this.props
    const isFormValid = isLinkValid && isTitleValid
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
            To create an achievement, please provide the link to your Facebook achievement post and provide a title for it
          </DialogContentText>
          <FacebookLinkHelp />
          <TextField
            autoFocus
            error={link !== LINK_INITIAL_VALUE && !isLinkValid}
            margin="normal"
            id='link'
            label="Where can Diadem Network users see your achievement?"
            value={link}
            onChange={this.handleChange('link')}
            placeholder='https://www.facebook.com/username/posts/postid'
            fullWidth
            helperText='Please copy Facebook link to your post'
          />
          <TextField
            error={title !== TITLE_INITIAL_VALUE && !isTitleValid}
            margin="normal"
            id='title'
            label="What great achievement did you do?"
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
            color="secondary"
            disabled={!isFormValid}
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
