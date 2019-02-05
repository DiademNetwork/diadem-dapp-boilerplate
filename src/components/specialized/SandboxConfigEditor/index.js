import React, { Component, Fragment } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Checkbox from './Checkbox'
import mocksController from 'mocks/controller'
import blockchains from 'configurables/blockchains'

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
    mocksController: mocksController.get(),
    modalOpen: false
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChangeConfig = (blockchainKey) => (name) => (value) => {
    const path = [blockchainKey, name]
    mocksController.set(path)(value)
    this.setState(R.set(R.lensPath(['mocksController', ...path]), value))
  }

  render () {
    const {
      modalOpen,
      mocksController
    } = this.state
    const {
      classes,
      fullScreen
    } = this.props
    const checkboxesCommonProps = {
      ...this.props,
      mocksController,
      onChange: this.handleChangeConfig
    }
    return (
      <Fragment>
        <Button
          className={classes.button}
          color="secondary"
          data-qa-id="open-sandbox-config-button"
          key="open-sandbox-config"
          onClick={this.handleClickOpen}
          variant="extendedFab"
        >
          <SettingsIcon />
        </Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          fullScreen={fullScreen}
          key="sandbox-config-modal"
          onClose={this.handleClose}
          open={modalOpen}
        >
          <DialogTitle
            key="sandbox-config-modal-title"
            id="form-dialog-title"
          >
              Sandbox Config
          </DialogTitle>
          <DialogContent>
            {blockchains.keys.map(blockchainKey => (
              <Fragment key={`${blockchainKey}-sandbox-config`}>
                <Typography
                  key={`${blockchainKey}-title`}
                  variant="h6"
                >
                  {blockchainKey}
                </Typography>
                <Checkbox
                  {...checkboxesCommonProps}
                  blockchainKey={blockchainKey}
                  key={`${blockchainKey}-is-registered`}
                  label="Is user registered"
                  name='isRegistered'
                />
                <Checkbox
                  {...checkboxesCommonProps}
                  blockchainKey={blockchainKey}
                  key={`${blockchainKey}-is-registration-pending`}
                  label="Is user pending registration"
                  name='isPendingRegistration'
                />
                <Checkbox
                  {...checkboxesCommonProps}
                  blockchainKey={blockchainKey}
                  key={`${blockchainKey}-is-address-matching`}
                  label="Is address matching"
                  name='isAddressMatchingTheOneRegistered'
                />
                <Checkbox
                  {...checkboxesCommonProps}
                  blockchainKey={blockchainKey}
                  key={`${blockchainKey}-is-registration-success`}
                  label="Is registration success"
                  name='isRegistrationSuccess'
                />
                <TextField
                  fullWidth
                  key={`${blockchainKey}-pendingTx`}
                  label="If not empty, an unconfirmed tx will be generated in next received fake tx"
                  margin="normal"
                  onChange={({ target: { value } }) => this.handleChangeConfig(blockchainKey)('pendingTxID')(value)}
                  placeholder=""
                  value={mocksController.pendingTxID}
                />
              </Fragment>
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              data-qa-id="close-sandbox-config-button"
              onClick={this.handleClose}
            >
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
  withStyles(styles)
)(SandboxConfigEditor)
