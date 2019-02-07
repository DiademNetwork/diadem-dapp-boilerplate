import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 2} 0`
  },
  chip: {
    margin: theme.spacing.unit
  }
})

class Filters extends Component {
  renderChip = (name, slug) => {
    const { classes, onSelect, selected } = this.props
    return (
      <Chip
        label={name}
        clickable
        className={classes.chip}
        color={selected === slug ? 'primary' : undefined}
        onClick={() => onSelect(slug)}
        variant="outlined"
      />
    )
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {this.renderChip('All achievements', 'all')}
        {this.renderChip('Yours only', 'user')}
      </div>
    )
  }
}

Filters.propTypes = {
  classes: T.object,
  onSelect: T.func,
  selected: T.string
}

export default R.compose(
  withStyles(styles)
)(Filters)
