import React, { Component, Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Filters from './Filters'
import List from './List'
import Create from './Create'
import * as R from 'ramda'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  sided: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

class Achievements extends Component {
  state = {
    selected: 'all'
  }

  handleSelect = (slug) => this.setState({ selected: slug })

  render () {
    const { classes } = this.props
    const { selected } = this.state
    return (
      <Fragment>
        <div className={classes.sided}>
          <Filters selected={selected} onSelect={this.handleSelect} />
          <Create />
        </div>
        <List selected={selected} />
      </Fragment>
    )
  }
}

Achievements.propTypes = {
  classes: T.object
}

export default R.compose(
  withStyles(styles)
)(Achievements)
