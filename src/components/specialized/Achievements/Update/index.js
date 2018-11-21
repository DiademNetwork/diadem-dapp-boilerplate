import React, { Component, Fragment } from 'react'
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
import FacebookLinkHelp from '../FacebookLinkHelp'
import StarIcon from '@material-ui/icons/Star'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import network from 'configurables/network'

const LINK_INITIAL_VALUE = ''
const TITLE_INITIAL_VALUE = ''
const MAX_TITLE_CARACTERS = 60

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
    title: TITLE_INITIAL_VALUE
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'link') {
      const isLinkValid = network.inputs.link.isValid(value)
      this.setState({ link: value, isLinkValid })
    } else if (name === 'title') {
      const isTitleValid = value.length > 0 && value.length <= MAX_TITLE_CARACTERS
      this.setState({ title: value, isTitleValid })
    }
  }

  handleSubmit = () => {
    const { onUpdate, previousLink } = this.props
    const { link, title } = this.state
    onUpdate({ link, previousLink, title })
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
    const {
      isLinkValid,
      isTitleValid,
      link,
      modalOpen,
      title
    } = this.state
    const {
      className,
      classes,
      fullScreen
    } = this.props
    const isFormValid = isLinkValid && isTitleValid
    return (
      <Fragment>
        <Button
          aria-label="Update"
          className={className}
          color="secondary"
          data-qa-id="update-achievement-button"
          key="update-achievement-button"
          onClick={this.handleClickOpen}
          variant="extendedFab"
        >
          <StarIcon className={classes.buttonIcon} />
          Update your Achievement
        </Button>
        <Dialog
          fullScreen={fullScreen}
          key='update-achievement-modal'
          open={modalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update your achievement</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              {`To update your achievement, please provide the previous link of your ${network.name} achievement post and provide a title for it`}
            </DialogContentText>
            <DialogContentText>
              Please be aware that after updating your achievement, people will not anymore be able to confirm/support/deposit the previous one.
            </DialogContentText>
            <FacebookLinkHelp />
            <TextField
              autoFocus={!fullScreen}
              id='link'
              margin="normal"
              error={link !== LINK_INITIAL_VALUE && !isLinkValid}
              label={`Your new achievement ${network.name} post link`}
              value={link}
              onChange={this.handleChange('link')}
              placeholder={network.inputs.link.placeholder}
              fullWidth
              helperText={`max ${network.inputs.link.maxCaracters} caracters`}
            />
            <TextField
              id='title'
              margin="normal"
              error={link !== TITLE_INITIAL_VALUE && !isTitleValid}
              label="Title for you achievement"
              value={title}
              onChange={this.handleChange('title')}
              placeholder="Help the world by my action..."
              fullWidth
              helperText={`max ${MAX_TITLE_CARACTERS} caracters`}
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
      </Fragment>
    )
  }
}

UpdateAchievement.propTypes = {
  className: T.string,
  classes: T.object,
  fullScreen: T.bool,
  onUpdate: T.func,
  previousLink: T.string
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles)
)(UpdateAchievement)
