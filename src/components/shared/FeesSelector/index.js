import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import blockchains from 'configurables/blockchains'

const getInitialFees = (blockchainKey) => blockchains[blockchainKey].fees.initial

const getInitialForm = (blockchainKey) => ({
  useCustomFees: false,
  fees: getInitialFees(blockchainKey),
  areFeesValid: true
})

export class FeesSelector extends Component {
  constructor (props) {
    super(props)
    this.state = getInitialForm(props.blockchain.key)
  }

  static getInitialFees = getInitialFees

  static areFeesValid = ({ blockchainKey, fees }) => R.allPass([
    R.is(Number),
    R.lte(R.__, blockchains[blockchainKey].fees.max),
    R.gte(R.__, blockchains[blockchainKey].fees.min)
  ])(fees)

  useCustomFees = () => this.setState({
    useCustomFees: true
  })

  useDefaultFees = () => {
    this.setState({ useCustomFees: false })
    this.props.onChange(getInitialFees(this.props.blockchain.key))
    this.resetForm()
  }

  resetForm = () => this.setState(getInitialForm(this.props.blockchain.key))

  handleCheckboxChange = event => {
    const checked = event.target.checked
    checked ? this.useCustomFees() : this.useDefaultFees()
  }

  handleChange = (e) => {
    this.props.onChange(parseFloat(e.target.value) || 0)
  }

  render () {
    const { useCustomFees } = this.state
    const { blockchain, error, value } = this.props
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
          label={`I want to use custom fees instead of default ${getInitialFees(blockchain.key)} ${blockchain.name} per kilobyte`}
        />
        {useCustomFees && (
          <TextField
            data-qa-id='fees-selector-input'
            error={error}
            fullWidth
            helperText='The less you pay, the more time it will take to be confirmed'
            id='fees'
            label={`max ${blockchains[blockchain.key].fees.max} - min ${blockchains[blockchain.key].fees.min}`}
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
  blockchain: T.object.isRequired,
  error: T.bool,
  onChange: T.func,
  value: T.number
}

export default FeesSelector
