import React, { Component } from 'react'
import withRouter from 'components/hocs/withRouter'
import { PropTypes as T } from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import * as R from 'ramda'

const styles = (theme) => ({
  tabs: {
    marginBottom: theme.spacing.unit * 2
  },
  tabBadge: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

class AppTabs extends Component {
  handleChange = (e, tabIdx) => {
    const { tabs, onChange } = this.props
    onChange && onChange(tabs[tabIdx].path)
  }

  render () {
    const { classes, tabs, pathname } = this.props
    const valueIdx = R.findIndex(R.propEq('path', pathname))(tabs)
    return (
      <Tabs
        className={classes.tabs}
        key='tabs'
        value={valueIdx !== -1 ? valueIdx : 0}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {R.map(({ label }) => (
          <Tab
            data-qa-id={`tab-${label.toLowerCase()}`}
            key={label}
            label={label}
          />
        ), tabs)}
      </Tabs>
    )
  }
}

AppTabs.propTypes = {
  classes: T.object,
  onChange: T.func,
  pathname: T.string,
  tabs: T.array
}

export default R.compose(
  withRouter,
  withStyles(styles)
)(AppTabs)
