import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import network from 'configurables/network'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import DialogContentText from '@material-ui/core/DialogContentText'
import withContainer from './container'
import Modal from 'components/shared/Modal'
import NetworkLinkHelp from './NetworkLinkHelp'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  openButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      bottom: 0,
      right: 0,
      left: 0,
      width: '100vw',
      borderRadius: 'initial',
      zIndex: 1000
    }
  }
})

const LINK_INITIAL_VALUE = ''
const TITLE_INITIAL_VALUE = ''
const MAX_TITLE_CARACTERS = 60

const initialForm = {
  isLinkValid: false,
  isTitleValid: false,
  link: LINK_INITIAL_VALUE,
  title: TITLE_INITIAL_VALUE
}

class CreateAchievement extends Component {
  state = initialForm

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'link') {
      const isLinkValid = network.inputs.link.isValid({ previousLink: '' })(value)
      this.setState({ link: value, isLinkValid })
    } else if (name === 'title') {
      const isTitleValid = value.length > 0 && value.length <= MAX_TITLE_CARACTERS
      this.setState({ title: value, isTitleValid })
    }
  }

  handleConfirm = () => {
    const { createAchievement } = this.props
    const { link, title } = this.state
    createAchievement({ link, title })
    this.resetForm()
  }

  resetForm = () => this.setState(initialForm)

  render () {
    const { isLinkValid, isTitleValid, link, title } = this.state
    const { canCreateAchievement, classes } = this.props
    const isFormValid = isLinkValid && isTitleValid
    return (
      <Modal
        className={classes.openButton}
        confirmButtonDisabled={!isFormValid}
        confirmButtonText="Create"
        disabled={!canCreateAchievement}
        name={`achivement-create-modal`}
        onConfirm={this.handleConfirm}
        openButtonText="Create your Achievement"
        title="Create your Achievement"
        render={({ fullScreen }) => (
          <Fragment>
            <DialogContentText key="help">
              {`To create an achievement, please provide the link to your ${network.name} achievement post and provide a title for it`}
            </DialogContentText>
            <NetworkLinkHelp key="link-help" />
            <TextField
              key="link"
              autoFocus={!fullScreen}
              error={link !== LINK_INITIAL_VALUE && !isLinkValid}
              margin="normal"
              id='link'
              label={`Your achievement ${network.name} post link`}
              value={link}
              onChange={this.handleChange('link')}
              placeholder={network.inputs.link.placeholder}
              fullWidth
              helperText={`max ${network.inputs.link.maxCaracters} caracters`}
            />
            <TextField
              key="title"
              error={title !== TITLE_INITIAL_VALUE && !isTitleValid}
              margin="normal"
              id='title'
              label="Title for you achievement"
              value={title}
              onChange={this.handleChange('title')}
              placeholder='Help the world by my action...'
              fullWidth
              helperText={`max ${MAX_TITLE_CARACTERS} caracters`}
            />
          </Fragment>
        )}
      />
    )
  }
}

CreateAchievement.propTypes = {
  canCreateAchievement: T.bool,
  classes: T.object,
  createAchievement: T.func
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(CreateAchievement)
