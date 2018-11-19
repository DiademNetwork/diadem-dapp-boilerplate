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
import Divider from '@material-ui/core/Divider'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import withContainer from './container'
import MenuItem from '@material-ui/core/MenuItem'
import Hidden from '@material-ui/core/Hidden'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import { withStyles } from '@material-ui/core/styles'
import Link from 'components/shared/Link'
import FeesSelector from 'components/shared/FeesSelector'

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
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE,
    isWitnessUserIDValid: false,
    isAmountValid: false,
    modalOpen: false
  }

  handleClickOpen = () => {
    this.props.fetchUsers()
    this.setState({ modalOpen: true })
  }

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

  handleFeesChange = (fees) => {
    const areFeesValid = FeesSelector.areFeesValid(fees)
    this.setState({
      fees,
      areFeesValid
    })
  }

  handleSubmit = () => {
    const { onDeposit, users } = this.props
    const { amount, fees, witnessUserID } = this.state
    const witnessAddress = this.findWitness('userAddress')(witnessUserID)(users)
    const witnessName = this.findWitness('userName')(witnessUserID)(users)
    onDeposit({
      amount,
      fees: FeesSelector.convertFees(fees),
      witnessAddress,
      witnessName,
      witnessUserID
    })
    this.resetForm()
    this.handleClose()
  }

  findWitness = (propName) => (userID) => R.compose(
    R.prop(propName),
    R.find(R.propEq('userAccount', userID))
  )

  resetForm = () => this.setState({
    amount: AMOUNT_INITIAL_VALUE,
    areFeesValid: true,
    fees: FeesSelector.INITIAL_FEES,
    isAmountValid: false,
    isWitnessUserIDValid: false,
    witnessUserID: WITNESS_USER_ID_INITIAL_VALUE
  })

  render () {
    const {
      className,
      classes,
      confirmationsCount,
      fullScreen,
      idx,
      link,
      creatorName,
      title,
      users,
      walletBalance
    } = this.props
    const isBalancePositive = walletBalance && walletBalance > 0
    const {
      amount,
      areFeesValid,
      modalOpen,
      fees,
      isWitnessUserIDValid,
      isAmountValid,
      witnessUserID
    } = this.state
    return (
      <Fragment>
        <Button
          aria-label="Deposit"
          className={className}
          data-qa-id={`achievement-${idx}-deposit-button`}
          key='achievement-deposit-button'
          disabled={!isBalancePositive}
          onClick={this.handleClickOpen}
          color="secondary"
          variant={fullScreen ? 'contained' : 'extendedFab'}
        >
          <Hidden smDown>
            <VpnKeyOutlinedIcon className={classes.icon} />
          </Hidden>
          Deposit
        </Button>
        <Dialog
          fullScreen={fullScreen}
          key='achievement-deposit-modal'
          open={modalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Deposit</DialogTitle>
          <DialogContent>
            <DialogContentText paragraph>
              {!confirmationsCount || confirmationsCount === 0 ? (
                `Are you sure of what you do ? This achievement has not been confirmed by anyone yet`
              ) : (
                `This achievement has been confirmed ${confirmationsCount} times`
              )}
            </DialogContentText>
            <Divider style={{ marginBottom: '16px' }} />
            <DialogContentText paragraph>
              <Link
                text="View achievement Facebook post again"
                href={link}
                typographyProps={{ paragraph: true }}
              />
            </DialogContentText>
            <DialogContentText paragraph>
              Please enter an amount you would like to send to support {creatorName} for his achievement:
            </DialogContentText>
            <DialogContentText paragraph color="textPrimary">
              {title}
            </DialogContentText>
            <Divider style={{ marginBottom: '16px' }} />
            <TextField
              autoFocus={!fullScreen}
              error={amount !== AMOUNT_INITIAL_VALUE && !isAmountValid}
              margin="normal"
              id='amount'
              label={`Amount in QTUM - maximum ${walletBalance} QTUM minus fees)`}
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
            <FeesSelector
              error={!areFeesValid}
              onChange={this.handleFeesChange}
              value={fees}
            />
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
      </Fragment>
    )
  }
}

AchievementDeposit.propTypes = {
  className: T.string,
  classes: T.object,
  confirmationsCount: T.number,
  fetchUsers: T.func,
  fullScreen: T.bool,
  idx: T.number,
  link: T.string,
  creatorName: T.string,
  onDeposit: T.func,
  title: T.string,
  users: T.array,
  walletBalance: T.number
}

export default R.compose(
  withMobileDialog(),
  withContainer,
  withStyles(styles)
)(AchievementDeposit)
