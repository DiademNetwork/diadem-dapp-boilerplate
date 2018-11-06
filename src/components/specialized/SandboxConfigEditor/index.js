import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { withSandboxConfigContextConsumer } from 'components/contexts/SandboxConfig'
import Checkbox from './Checkbox'

const styles = () => ({
  button: {
    borderRadius: 0,
    position: 'fixed',
    left: 0,
    top: '50%'
  }
})

class SandboxConfigEditor extends Component {
  state = {
    modalOpen: false
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render () {
    const { modalOpen } = this.state
    const {
      classes,
      fullScreen
    } = this.props
    return (
      <Fragment>
        <Button
          className={classes.button}
          color="secondary"
          data-qa-id="open-sandbox-config"
          key="open-sandbox-config"
          onClick={this.handleClickOpen}
          variant="extendedFab"
        >
          <SettingsIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          key='sandbox-config-modal'
          open={modalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sandbox Config</DialogTitle>
          <DialogContent>
            <Checkbox {...this.props} name='isUserRegistered' label="Is user registered" />
            <Checkbox {...this.props} name='isUserPendingRegistration' label="Is user pending registration" />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

SandboxConfigEditor.propTypes = {
  classes: T.object,
  fullScreen: T.bool,
  onChangeSandboxConfig: T.func,
  sandboxConfig: T.object
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles),
  withSandboxConfigContextConsumer
)(SandboxConfigEditor)
