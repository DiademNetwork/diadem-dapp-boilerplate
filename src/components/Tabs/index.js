import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import * as R from 'ramda'

const AppTabSelector = ({ label }) => (
  <Tab key={label} label={label} />
)

AppTabSelector.propTypes = {
  label: T.string
}

const AppTab = ({ children }) => children

AppTab.propTypes = {
  component: T.node
}

const styles = (theme) => ({
  tabs: {
    marginBottom: theme.spacing.unit * 2
  }
})

class AppTabs extends Component {
  state = {
    tabIdx: 0
  }

  handleChange = (e, tabIdx) => {
    this.setState({ tabIdx })
  }

  render () {
    const { tabIdx } = this.state
    const { classes, tabs } = this.props
    return [
      <Tabs
        className={classes.tabs}
        key='tabs'
        value={tabIdx}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {R.map(AppTabSelector, tabs)}
      </Tabs>,
      <AppTab key='tab'>
        {tabs[tabIdx].component}
      </AppTab>
    ]
  }
}

AppTabs.propTypes = {
  classes: T.object,
  tabs: T.array
}

export default withStyles(styles)(AppTabs)
