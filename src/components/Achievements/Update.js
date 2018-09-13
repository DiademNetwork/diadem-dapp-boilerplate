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
import StarIcon from '@material-ui/icons/Star'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import isUrl from 'is-url'

const LINK_INITIAL_VALUE = ''
const TITLE_INITIAL_VALUE = ''
const PREVIOUS_LINK_INITIAL_VALUE = ''

const styles = (theme) => ({
  buttonIcon: {
    marginRight: theme.spacing.unit
  }
})

class UpdateAchievement extends Component {
  state = {
    isLinkValid: false,
    isPreviousLinkValid: true,
    isTitleValid: false,
    link: LINK_INITIAL_VALUE,
    modalOpen: false,
    previousLink: PREVIOUS_LINK_INITIAL_VALUE,
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
    } else if (name === 'previousLink') {
      const isPreviousLinkValid = value === '' || this.isFacebookLinkValid(value)
      this.setState({ previousLink: value, isPreviousLinkValid })
    }
  }

  isFacebookLinkValid = R.allPass([
    R.is(String),
    isUrl,
    R.test(/.*facebook.*/)
  ])

  handleSubmit = () => {
    const { onUpdate } = this.props
    const { link, title, previousLink } = this.state
    onUpdate({ link, previousLink, title })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    isLinkValid: false,
    isPreviousLinkValid: true,
    isTitleValid: false,
    link: LINK_INITIAL_VALUE,
    previousLink: PREVIOUS_LINK_INITIAL_VALUE,
    title: TITLE_INITIAL_VALUE
  })

  render () {
    const {
      isLinkValid,
      isTitleValid,
      isPreviousLinkValid,
      link,
      modalOpen,
      previousLink,
      title
    } = this.state
    const {
      className,
      classes,
      fullScreen
    } = this.props
    const isFormValid = isLinkValid && isTitleValid && isPreviousLinkValid
    return [
      <Button
        aria-label="Update"
        className={className}
        color="secondary"
        key="update-achievement-button"
        onClick={this.handleClickOpen}
        variant="extendedFab"
      >
        <StarIcon className={classes.buttonIcon} />
        Update your Achievement
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key='update-achievement-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update your achievement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your achievement, please provide the previous link of your Facebook achievement post and provide a title for it
          </DialogContentText>
          <FacebookLinkHelp />
          <TextField
            autoFocus
            error={link !== PREVIOUS_LINK_INITIAL_VALUE && !isPreviousLinkValid}
            margin="normal"
            id='previousLink'
            label="Previous Facebook link of your achievement post"
            value={previousLink}
            onChange={this.handleChange('previousLink')}
            placeholder='https://www.facebook.com/username/posts/postid'
            fullWidth
            helperText='Please paste here full Facebook link to your previous post'
          />
          <TextField
            id='link'
            margin="normal"
            error={link !== LINK_INITIAL_VALUE && !isLinkValid}
            label="Facebook link of your achievement post"
            value={link}
            onChange={this.handleChange('link')}
            placeholder='https://www.facebook.com/username/posts/postid'
            fullWidth
            helperText='Please paste here full Facebook link to your new post'
          />
          <TextField
            id='title'
            margin="normal"
            error={link !== TITLE_INITIAL_VALUE && !isTitleValid}
            label="New title for your achievement"
            value={title}
            onChange={this.handleChange('title')}
            placeholder='wrote the second chapter of my book'
            fullWidth
            helperText='I ..your title..'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
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

UpdateAchievement.propTypes = {
  className: T.string,
  classes: T.object,
  fullScreen: T.bool,
  onUpdate: T.func
}

export default withMobileDialog()(withStyles(styles)(UpdateAchievement))
