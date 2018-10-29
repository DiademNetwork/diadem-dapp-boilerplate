import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputAdornment from '@material-ui/core/InputAdornment'

const INITIAL_FEES = parseFloat(process.env.DEFAULT_QTUM_FEES_PER_KILOBYTE) || 0.008
const MAX_FEES = process.env.MAX_QTUM_FEES_PER_KILOBYTE || 0.1
const MIN_FEES = INITIAL_FEES / 2

export class FeesSelector extends Component {
  state = {
    useCustomFees: false,
    fees: INITIAL_FEES,
    areFeesValid: true
  }

  static INITIAL_FEES = INITIAL_FEES

  static convertFees = (fees) => Math.ceil(fees * 1e8 / 1024)

  static areFeesValid = R.allPass([
    R.is(Number),
    R.lte(R.__, MAX_FEES),
    R.gte(R.__, MIN_FEES)
  ])

  useCustomFees = () => this.setState({
    useCustomFees: true
  })

  useDefaultFees = () => {
    this.setState({ useCustomFees: false })
    this.props.onChange(INITIAL_FEES)
    this.resetForm()
  }

  resetForm = () => this.setState({
    fees: INITIAL_FEES,
    areFeesValid: true
  })

  handleCheckboxChange = event => {
    const checked = event.target.checked
    checked ? this.useCustomFees() : this.useDefaultFees()
  }

  handleChange = (e) => {
    this.props.onChange(parseFloat(e.target.value) || 0)
  }

  render () {
    const { useCustomFees } = this.state
    const { error, value } = this.props
    return (
      <React.Fragment>
        <FormControlLabel
          control={
            <Checkbox
              id='fees-selector-checkbox'
              color="secondary"
              checked={useCustomFees}
              onChange={this.handleCheckboxChange}
            />
          }
          label={`I want to use custom fees instead of default ${INITIAL_FEES} QTUM per kilobyte`}
        />
        {useCustomFees && (
          <TextField
            data-qa-id='fees-selector-input'
            error={error}
            fullWidth
            helperText='The less you pay, the more time it will take to be confirmed'
            id='fees'
            InputProps={{
              endAdornment: <InputAdornment position="end">QTUM/kB</InputAdornment>
            }}
            label={`max ${MAX_FEES} - min ${MIN_FEES}`}
            margin="normal"
            onChange={this.handleChange}
            type='number'
            value={value}
          />
        )}
      </React.Fragment>
    )
  }
}

FeesSelector.propTypes = {
  error: T.bool,
  onChange: T.func,
  value: T.number
}

export default FeesSelector
