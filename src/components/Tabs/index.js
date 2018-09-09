import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
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

class AppTabs extends Component {
  state = {
    tabIdx: 0
  }

  handleChange = (e, tabIdx) => {
    this.setState({ tabIdx })
  }

  render () {
    const { tabIdx } = this.state
    const { tabs } = this.props
    return [
      <Tabs
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
  tabs: T.array
}

export default AppTabs
