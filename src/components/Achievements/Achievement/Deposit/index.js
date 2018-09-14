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
import Divider from '@material-ui/core/Divider'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import withContainer from './container'
import MenuItem from '@material-ui/core/MenuItem'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import { withStyles } from '@material-ui/core/styles'
import Link from '../../../Link'

const AMOUNT_INITIAL_VALUE = ''
const WITNESS_USER_ID_INITIAL_VALUE = ''

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit
  }
})

class AchievementDeposit extends Component {
  state = {
    amount: AMOUNT_INITIAL_VALUE,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE,
    isWitnessUserIDValid: false,
    isAmountValid: false,
    modalOpen: false
  }

  componentDidMount () {
    this.props.fetchUsers()
  }

  handleClickOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = name => e => {
    const value = e.target.value
    if (name === 'witnessUserID') {
      const isWitnessUserIDValid = R.test(/^[0-9]/)(value)
      this.setState({ witnessUserID: value, isWitnessUserIDValid })
    } else if (name === 'amount') {
      const isAmountValid = value > 0
      this.setState({ amount: value, isAmountValid })
    }
  }

  handleSubmit = () => {
    const { onDeposit } = this.props
    const { amount, witnessUserID } = this.state
    onDeposit({ amount, witnessUserID })
    this.resetForm()
    this.handleClose()
  }

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE,
    isWitnessUserIDValid: false,
    isAmountValid: false
  })

  render () {
    const {
      actionAlreadyDone,
      className,
      classes,
      confirmationsCount,
      fullScreen,
      link,
      name,
      title,
      users,
      walletBalance
    } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const { amount, modalOpen, witnessUserID, isWitnessUserIDValid, isAmountValid } = this.state
    return [
      <Button
        aria-label="Deposit"
        className={className}
        key='achievement-deposit-button'
        disabled={!isBalancePositive || actionAlreadyDone}
        onClick={this.handleClickOpen}
        color="secondary"
        variant="extendedFab"
      >
        <VpnKeyOutlinedIcon className={classes.icon} />
        {actionAlreadyDone ? 'You have already deposit' : 'Deposit'}
      </Button>,
      <Dialog
        fullScreen={fullScreen}
        key='achievement-deposit-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {!confirmationsCount || confirmationsCount === 0 ? (
              `Are you sure of what you do ? This achievement has not been confirmed by anyone yet`
            ) : (
              `This achievement has been confirmed ${confirmationsCount} times`
            )}<br /><br />
            <Divider /><br />
            <Link
              text="View achievement Facebook post again"
              href={link}
              typographyProps={{ paragraph: true }}
            />
            Please enter an amount (max {walletBalance} QTUM minus fees of around 0.01 QTUM) you would like to send to support {name}<br />
            for his achievement:<br /><br />
            {title}<br /><br />
          </DialogContentText>
          <TextField
            autoFocus
            error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
            margin="normal"
            id='amount'
            label="Amount (in QTUM)"
            value={amount}
            onChange={this.handleChange('amount')}
            type='number'
            fullWidth
          />
          <TextField
            error={witnessUserID !== WITNESS_USER_ID_INITIAL_VALUE && !isWitnessUserIDValid}
            select
            label="Select a witness user"
            margin="normal"
            onChange={this.handleChange('witnessUserID')}
            fullWidth
            value={witnessUserID}
          >
            {users.map(({ userAccount, userName }) => (
              <MenuItem key={userAccount} value={userAccount}>
                {userName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!isWitnessUserIDValid || !isAmountValid}
            onClick={this.handleSubmit}
            variant="contained"
            color="secondary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

AchievementDeposit.propTypes = {
  actionAlreadyDone: T.bool,
  className: T.string,
  classes: T.object,
  confirmationsCount: T.number,
  fetchUsers: T.func,
  fullScreen: T.bool,
  link: T.string,
  name: T.string,
  onDeposit: T.func,
  title: T.string,
  users: T.array,
  walletBalance: T.number
}

export default withMobileDialog()(withContainer(withStyles(styles)(AchievementDeposit)))
